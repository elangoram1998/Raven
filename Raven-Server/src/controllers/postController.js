const { Post } = require('../model/post_collection');
const { User } = require('../model/user_collection');
const { uniqueArray } = require('../utils/uniqueArray');
const { uploadImage } = require('../utils/aws');
const { v4: uuid } = require('uuid');

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

const newPost = async (req, res) => {
    try {
        let myFile = req.file.originalname.split(".");
        const fileType = myFile[myFile.length - 1];
        const filename = `${uuid()}.${fileType}`;
        const data = await uploadImage(filename, req.file.buffer);
        const post = new Post({
            user_id: req.user._id,
            original_name: req.file.originalname,
            caption: req.body.caption,
            media_type: fileType,
            aws_key_name: filename,
            storage_url: data.Location,
        });
        await post.save();
        const response = await Post.findById({ _id: post._id }).populate({
            path: 'user_id',
            select: '_id username avatar'
        });
        res.status(200).send(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const updatePost = async (req, res) => {
    try {
        console.log(req.body);
        const changes = req.body.changes;
        const post = await Post.findById({ _id: req.body._id });
        post.total_likes = changes.total_likes;
        await post.save();
        res.status(200).json({
            success: "post updated successfully"
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = {
    getMyFeed,
    newPost,
    updatePost
}