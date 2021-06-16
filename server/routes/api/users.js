const express = require('express');
const router=express.Router();
require('dotenv').config();
const crypto=require('crypto');

//setting up environment variables
const accountSid=process.env.ACCOUNT_SID;
const authToken=process.env.AUTH_TOKEN;
const client=require('twilio')(accountSid,authToken);
const twilioNum = process.env.TWILIO_PHONE_NUMBER;
const jwt = require('jsonwebtoken');
const JWT_AUTH_TOKEN=process.env.JWT_AUTH_TOKEN;
const smsKey=process.env.SMS_SECRET_KEY;
const auth=require('../../middleware/auth');
const User=require('../../models/User');
const {check,validationResult}=require('express-validator');

//load user by token
router.get('/', auth, async (req, res) => {
	try {
	  const user = await User.findById(req.user.id);
	  res.json(user);
	} catch (error) {
	  
	  return res.status(400).json({ errors: [{msg:'server error'}] });
	}
  });

//@router POST api/sendOTP
//@desc Register user
//@access public
router.post('/sendOTP',check('userName','Name is required').not().isEmpty(),
check('phone','Phone No is required').not().isEmpty(),async(req, res) => {
	const errors=validationResult(req);
	if(!errors.isEmpty())
    {
      return res.status(400).json({errors:errors.array()});
    }
	const userName=req.body.userName;
	const phone = req.body.phone;
	const otp = Math.floor(100000 + Math.random() * 900000);
	const ttl = 2 * 60 * 1000;
	const expires = Date.now() + ttl;
	const data = `${phone}.${otp}.${expires}`;
	const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
	const fullHash = `${hash}.${expires}`;

	client.messages
		.create({
			body: `Your One Time Login Password For covid-assist is ${otp}`,
			from: twilioNum,
			to: phone
		})
		.then((messages) => console.log(messages))
		.catch((err) => console.error(err));

	
	 res.status(200).send({ phone, hash: fullHash,otp,userName });          
});

//@router POST api/verifyOTP
//@desc verify otp recieved
//@access public
router.post('/verifyOTP', async(req, res) => {
	const userName=req.body.name;
	const phone = req.body.phone;
	const hash = req.body.hash;
	const otp = req.body.otp;
	let [ hashValue, expires ] = hash.split('.');

	let now = Date.now();
	if (now > parseInt(expires)) {
		return res.status(400).json({ errors: [{msg:'Time Out Please Try again'}] });
	}
	let data = `${phone}.${otp}.${expires}`;
	let newCalculatedHash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
	if (newCalculatedHash === hashValue) {
		
		let user=await User.findOne({phone}) ;
		if(!user){
			user=new User({
				userName,
				phone
			});
			await user.save();
			
		}
		const payload={
			user:{
				id:user.id
			}
		};

		
		
		 jwt.sign(payload, JWT_AUTH_TOKEN, { expiresIn: '60000s' },(err,token)=>{
			if(err) return res.status(400).json({ errors: [{msg:'incorrect Phone No'}] });
			res.json({token});
		});
			
	} else {
		return res.status(400).json({ errors: [{msg:'incorrect OTP'}] });
	}
});


module.exports=router;
