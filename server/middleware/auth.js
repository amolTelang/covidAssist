require('dotenv').config();

const JWT_AUTH_TOKEN=process.env.JWT_AUTH_TOKEN;





module.exports=async function authenticateUser(req, res, next) {
	const accessToken = req.cookies.accessToken;

	jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
		if (phone) {
			req.phone = phone;
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