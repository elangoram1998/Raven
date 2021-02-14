const { Post } = require('../model/post_collection');
const { uniqueArray } = require('../utils/uniqueArray');

const getMyFeed = async (req, res) => {
    try {
        const usersArray = req.user.followings;
        usersArray.push(req.user._id);
        const publicProfiles = await User.find({ profile_type: 'public' });
        usersArray = uniqueArray(usersArray, publicProfiles);
        const feeds = await Post.getMyFeed(usersArray);
        res.status(200).send(feeds);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = {
    getMyFeed
}