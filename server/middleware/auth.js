//modules
require('dotenv').config();
const jwt = require('jsonwebtoken');

//env of refresh token
const JWT_AUTH_TOKEN=process.env.JWT_AUTH_TOKEN;

//auth function to check  the token 
module.exports= function (req, res, next) {
	const token = req.header('x-auth-token');

	// Check if not token
	if (!token) {
	  return res.status(401).json({ msg: 'No token, authorization denied' });
	}
	
	
	
	// Verify token
	try {
	  const decoded=jwt.verify(token, JWT_AUTH_TOKEN);
	
		req.user=decoded.user;
		next();
	} catch (err) {
	  console.error('something wrong with auth middleware');
	  res.status(500).json({ msg: 'Server Error' });
	}
}