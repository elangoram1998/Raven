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
        console.log(req.file);
        let myFile = req.file.originalname.split(".");
        const fileType = myFile[myFile.length - 1];
        const filename = `${uuid()}.${fileType}`;
        const data = await uploadImage(filename, req.file.buffer);
        console.log(data);
        const post = new Post({
            user_id: req.user._id,
            original_name: req.file.originalname,
            media_type: fileType,
            aws_key_name: filename,
            storage_url: data.Location,
            caption: req.body.caption
        });
        await post.save();
        res.status(200).send(post);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = {
    getMyFeed,
    newPost
}