const { Post } = require('../model/post_collection');
const { User } = require('../model/user_collection');
const { uniqueArray } = require('../utils/uniqueArray');

const getMyFeed = async (req, res) => {
    try {
        const usersArray = req.userData.followings;
        usersArray.push(req.user._id);
        const publicProfiles = await User.find({ profile_type: 'public' });
        const postOfUsers = uniqueArray(usersArray, publicProfiles);
        const feeds = await Post.getMyFeeds(postOfUsers);
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