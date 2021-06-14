//modules
require('dotenv').config();
const jwt = require('jsonwebtoken');

//env of refresh token
const JWT_ACCESS_TOKEN=process.env.JWT_ACCESS_TOKEN;

//auth function to check  the token 
module.exports=async function (req, res, next) {
	const token = req.header('x-auth-token');

	// Check if not token
	if (!token) {
	  return res.status(401).json({ msg: 'No token, authorization denied' });
	}
  
	// Verify token
	try {
	  jwt.verify(token, JWT_ACCESS_TOKEN, (error, decoded) => {
		if (error) {
		  return res.status(401).json({ msg: 'Token is not valid' });
		} else {
		  req.user = decoded.user;
		  next();
		}
	  });
	} catch (err) {
	  console.error('something wrong with auth middleware');
	  res.status(500).json({ msg: 'Server Error' });
	}
}