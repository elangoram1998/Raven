const { User } = require('../model/user_collection');
const { uniqueArray, excludeMyFriends } = require('../utils/uniqueArray');

const getFriendSuggestion = async (req, res) => {
    try {
        const toBeExcluded = req.userData.followings;
        toBeExcluded.push(req.user._id);
        const users = await User.find().select('_id username avatar');
        const friendSuggestion = excludeMyFriends(toBeExcluded, users);
        res.status(200).send(friendSuggestion);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = {
    getFriendSuggestion
}