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
const JWT_REFRESH_TOKEN=process.env.JWT_REFRESH_TOKEN;
let refreshTokens = [];
const authenticateUser=require('../../middleware/auth')
const smsKey=process.env.SMS_SECRET_KEY;
const auth=require('../../middleware/auth');
const User=require('../../models/User');

//load user by token
router.get('/', auth, async (req, res) => {
	try {
	  const user = await User.findById(req.user.id);
	  res.json(user);
	} catch (error) {
	  console.error(error.message);
	  res.status(500).send('Server Error');
	}
  });

//@router POST api/sendOTP
//@desc Register user
//@access public
router.post('/sendOTP', (req, res) => {
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

	// // res.status(200).send({ phone, hash: fullHash, otp });  // this bypass otp via api only for development instead hitting twilio api all the time
	 res.status(200).send({ phone, hash: fullHash,otp,userName });          // Use this way in Production
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
		return res.status(504).send({ msg: 'Timeout. Please try again' });
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
		
		
		 jwt.sign(payload, JWT_AUTH_TOKEN, { expiresIn: '30s' },(err,token)=>{
			if(err) throw err;
			res.json({token});
		});
			
	} else {
		console.log('not authenticated');
		return res.status(400).send({ verification: false, msg: 'Incorrect OTP' });
	}
});


module.exports=router;
