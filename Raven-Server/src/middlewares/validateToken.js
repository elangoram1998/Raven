const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../model/user_collection');

const validateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decode = await jwt.decode(token, config.get('resetKey'));
        const user = await User.findOne({ _id: decode._id, 'resetPassword.token': token });
        if (!user) {
            throw new Error('unable to change your password');
        }
        req.user = user;
        req.token = token;
        next();
    }
    catch (e) {
        console.log(e);
        res.staus(401).send(e);
    }
}

module.exports = validateToken;