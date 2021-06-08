require('dotenv').config();
const jwt = require('jsonwebtoken');


const JWT_REFRESH_TOKEN =process.env.JWT_REFRESH_TOKEN;





module.exports=async function authenticateUser(req, res, next) {
	const accessToken = req.cookies.refreshToken;

    // console.log(req);
	jwt.verify(accessToken, JWT_REFRESH_TOKEN, async (err,decoded) => {
		if (phone) {
			req.user = decoded.user;
			next();
		} else if (err.message === 'TokenExpiredError') {
			return res.status(403).send({
				success: false,
				msg: 'Access token expired'
			});
		} else {
			console.log(err);
			return res.status(403).send({ err, msg: 'User not authenticated' });
		}
	});
}