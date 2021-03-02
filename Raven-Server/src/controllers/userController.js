const { Post } = require('../model/post_collection');
const { v4: uuid } = require('uuid');
const { uploadImage } = require('../utils/aws');
const config = require('config');
const { User } = require('../model/user_collection');
const { UserData } = require('../model/user_data_collection');
const { removeFollower, removeChatRoom } = require('../utils/realTimeData');
const { ChatRoom } = require('../model/chat_room');

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

const updateUserFollowings = async (req, res) => {
    try {
        //const updatedFollowings = req.userData.followings.filter(id => id !== req.body.id);
        console.log("unfollow: " + req.body.id);
        const index = req.userData.followings.indexOf(req.body.id);
        req.userData.followings.splice(index, 1);
        //req.userData.followings = updatedFollowings;
        await req.userData.save();
        const myFollowing = await UserData.findOne({ user_id: req.body.id });
        //const oppUpdated = myFollowing.followers.filter(id => id !== req.user._id);
        const oppoIndex = myFollowing.followers.indexOf(req.user._id);
        myFollowing.followers.splice(oppoIndex, 1);
        // myFollowing.followers = oppUpdated;
        await myFollowing.save();

        console.log(req.userData.my_chat_rooms);
        const indexNext = req.userData.my_chat_rooms.findIndex(chatRoom => chatRoom.user_id.equals(req.body.id));
        console.log("index: " + indexNext);
        if (indexNext > -1) {
            req.userData.my_chat_rooms.splice(indexNext, 1);
            await req.userData.save();

            const oppoIndexNext = myFollowing.my_chat_rooms.findIndex(chatRoom => chatRoom.user_id.equals(req.user._id));
            myFollowing.my_chat_rooms.splice(oppoIndexNext, 1);
            await myFollowing.save();
            console.log("after")
            removeChatRoom(req.body.id, req.user._id);
        }

        removeFollower(req.body.id, req.user._id);


        res.status(200).json({
            'success': 'UserData Successfully Upadted'
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const updateUserChatRooms = async (req, res) => {
    try {
        console.log(req.userData);
        const index = req.userData.my_chat_rooms.findIndex(chatRoom => chatRoom.user_id === req.body.userId);
        req.userData.my_chat_rooms.splice(index, 1);
        await req.userData.save();
        const myFollowing = await UserData.findOne({ user_id: req.body.userId });
        const oppoIndex = myFollowing.my_chat_rooms.findIndex(chatRoom => chatRoom.user_id === req.user._id);
        myFollowing.my_chat_rooms.splice(oppoIndex, 1);
        await myFollowing.save();
        removeChatRoom(req.body.userId, req.user._id);
        res.status(200).json({
            'success': 'ChatRoom Successfully Upadted'
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const getMyPosts = async (req, res) => {
    try {
        const posts = await Post.find({ user_id: req.user._id }).populate({
            path: 'user_id',
            select: '_id username avatar'
        }).select('-aws_key_name').sort({ createdAt: -1 });
        res.status(200).send(posts);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const getMySavedPosts = async (req, res) => {
    try {
        const mySaved = req.userData.saved_post;
        const posts = await Post.find({
            '_id': {
                $in: mySaved
            }
        }).populate({
            path: 'user_id',
            select: '_id username avatar'
        }).select('-aws_key_name').sort({ createdAt: -1 });
        res.status(200).send(posts);
    }
    catch (e) {
        console.log(e);
        res.status(500).send();
    }
}

const changeProfilePic = async (req, res) => {
    try {
        let myFile = req.file.originalname.split(".");
        const fileType = myFile[myFile.length - 1];
        const filename = `${uuid()}.${fileType}`;
        const data = await uploadImage(filename, req.file.buffer);
        req.user.avatar = data.Location;
        await req.user.save();
        res.status(200).send(req.user);
    }
    catch (e) {
        console.log(e);
        res.status(500).send();
    }
}

const removeProfilePic = async (req, res) => {
    try {
        req.user.avatar = config.get('s3.defaultProfilePic');
        await req.user.save();
        res.status(200).send(req.user);
    }
    catch (e) {
        console.log(e);
        res.status(500).send();
    }
}

const editProfile = async (req, res) => {
    try {
        req.user.username = req.body.username;
        req.user.email = req.body.email;
        if (req.body.profile_type) {
            req.user.profile_type = 'public';
        }
        else {
            req.user.profile_type = 'private';
        }
        await req.user.save();
        if (req.body.bio) {
            req.userData.bio = req.body.bio;
            await req.userData.save();
        }
        res.status(200).json({
            user: req.user,
            userData: req.userData
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const changePassword = async (req, res) => {
    try {
        console.log(req.body);
        req.user.password = req.body.password;
        await req.user.save();
        res.status(200).send(true);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const getUsersData = async (req, res) => {
    try {
        const users = req.body.users;
        const response = await User.find({
            _id: {
                $in: users
            }
        }).select('_id username avatar');
        res.status(200).send(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = {
    updateUserData,
    getMyPosts,
    getMySavedPosts,
    changeProfilePic,
    removeProfilePic,
    editProfile,
    changePassword,
    getUsersData,
    updateUserFollowings,
    updateUserChatRooms
}