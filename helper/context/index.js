const jwt = require('jsonwebtoken');
const User = require('../../database/models/user');

module.exports.verifyUser = async (req) => {
    try {
        req.email = null;
        const { authorization: bearerHeader } = req.headers;
        if (bearerHeader) {
            const token = bearerHeader.split(' ')[1];
            const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || 'mysecretkey');
            const user = await User.findOne({ email: payload.email });
            return {
                email: payload.email,
                loggedInUserId: user.id,
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }

}
