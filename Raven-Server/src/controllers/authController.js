const { User } = require('../model/user_collection');
const { UserData } = require('../model/user_data_collection');

const register = async (req, res) => {
    try {
        console.log(req.body);
        const user = new User(req.body);
        await user.save();
        const userData = new UserData({
            user_id: user._id
        });
        await userData.save();

        // Send Mail functionality

        //
        res.status(200).send(true);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            'Error': e
        });
    }
}

const login = async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findUserByCredentials(req.body.username, req.body.password);
        const userData = await UserData.findOne({ user_id: user._id }).populate({
            path: 'my_chat_rooms.user_id',
            select: '_id username avatar',
            model: 'User'
        })
        const token = await user.generateToken();
        res.status(200).json({
            user,
            userData,
            token
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token != req.token);
        await req.user.save();
        res.status(200).send(true);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const test = async (req, res) => {
    try {

    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = {
    register,
    login,
    logout
}