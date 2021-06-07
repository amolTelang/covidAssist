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

const User=require('../../models/User');



//@router POST api/sendOTP
//@desc Register user
//@access public
router.post('/sendOTP', (req, res) => {
	const userName=req.body.name;
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

	// res.status(200).send({ phone, hash: fullHash, otp });  // this bypass otp via api only for development instead hitting twilio api all the time
	res.status(200).send({ phone, hash: fullHash,otp,userName });          // Use this way in Production
});

//@router POST api/verifyOTP
//@desc verify otp recieved
//@access public
router.post('/verifyOTP', async(req, res) => {
	const userName=req.body.userName;
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
		console.log('user confirmed');
		const accessToken = jwt.sign({ data: phone }, JWT_AUTH_TOKEN, { expiresIn: '30s' });
		const refreshToken = jwt.sign({ data: phone }, JWT_REFRESH_TOKEN, { expiresIn: '1y' });
		refreshTokens.push(refreshToken);
		res
			.status(202)
			.cookie('accessToken', accessToken, {
				expires: new Date(new Date().getTime() + 30 * 1000),
				sameSite: 'strict',
				httpOnly: true
			})
			.cookie('refreshToken', refreshToken, {
				expires: new Date(new Date().getTime() + 31557600000),
				sameSite: 'strict',
				httpOnly: true
			})
			.cookie('authSession', true, { expires: new Date(new Date().getTime() + 30 * 1000), sameSite: 'strict' })
			.cookie('refreshTokenID', true, {
				expires: new Date(new Date().getTime() + 31557600000),
				sameSite: 'strict'
			})
			.send({ msg: 'Device verified' });
			
			//checking if user exists if not then add him to the db

			let user=await User.findOne({phone}) ;
			if(!user){
				user=new User({
					userName,
					phone
				});
				await user.save();
				console.log(user);
				console.log("user registered");
			}

	} else {
		console.log('not authenticated');
		return res.status(400).send({ verification: false, msg: 'Incorrect OTP' });
	}
});

//@router POST api/verifyOTP
//@desc go to home page
//@access private
router.post('/home', authenticateUser, (req, res) => {
	console.log('home private route');
	res.status(202).send('Private Protected Route - Home');
});

// async function authenticateUser(req, res, next) {
// 	const accessToken = req.cookies.accessToken;

// 	jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
// 		if (phone) {
// 			req.phone = phone;
// 			next();
// 		} else if (err.message === 'TokenExpiredError') {
// 			return res.status(403).send({
// 				success: false,
// 				msg: 'Access token expired'
// 			});
// 		} else {
// 			console.log(err);
// 			return res.status(403).send({ err, msg: 'User not authenticated' });
// 		}
// 	});
// }


//@router POST api/refreshToken
//@desc referesh token
//@access public
router.post('/refresh', (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) return res.status(403).send({ message: 'Refresh token not found, login again' });
	if (!refreshTokens.includes(refreshToken))
		return res.status(403).send({ message: 'Refresh token blocked, login again' });

	jwt.verify(refreshToken, JWT_REFRESH_TOKEN, (err, phone) => {
		if (!err) {
			const accessToken = jwt.sign({ data: phone }, JWT_AUTH_TOKEN, {
				expiresIn: '30s'
			});
			return res
				.status(200)
				.cookie('accessToken', accessToken, {
					expires: new Date(new Date().getTime() + 30 * 1000),
					sameSite: 'strict',
					httpOnly: true
				})
				.cookie('authSession', true, {
					expires: new Date(new Date().getTime() + 30 * 1000),
					sameSite: 'strict'
				})
				.send({ previousSessionExpired: true, success: true });
		} else {
			return res.status(403).send({
				success: false,
				msg: 'Invalid refresh token'
			});
		}
	});
});

router.get('/logout', (req, res) => {
	res
		.clearCookie('refreshToken')
		.clearCookie('accessToken')
		.clearCookie('authSession')
		.clearCookie('refreshTokenID')
		.send('logout');
});

module.exports=router;
