const { Post } = require('../model/post_collection');

const updateUserData = async (req, res) => {
    try {
        console.log(req.body);
        req.userData.liked_post = req.body.userData.liked_post;
        req.userData.saved_post = req.body.userData.saved_post;
        req.userData.liked_comments = req.body.userData.liked_comments;
        await req.userData.save();
        res.status(200).json({
            'success': 'UserData Successfully Upadted'
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const getMyPosts = async (req, res) => {
    try {
        const posts = await Post.find({ user_id: req.user._id });
        res.status(200).send(posts);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = {
    updateUserData,
    getMyPosts
}