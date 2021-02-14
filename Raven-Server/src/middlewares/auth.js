const jwt = require('jsonwebtoken');
const config = require('config');

const { User } = require('../model/user_collection');
const { UserData } = require('../model/user_data_collection');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decode = await jwt.decode(token, config.get('tokenKey'));
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token });
        if (!user) {
            throw new Error('User session timeout');
        }
        const userData = await UserData.findOne({ user_id: user._id });
        req.user = user;
        req.userData = userData;
        req.token = token;
        next();
    }
    catch (e) {
        console.log(e);
        res.status(401).send({ 'Error': 'Please authendicate' });
    }
}

module.exports = auth;