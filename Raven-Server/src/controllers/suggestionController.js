const { User } = require('../model/user_collection');
const { UserData } = require('../model/user_data_collection');
const { ChatRoom } = require('../model/chat_room');
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

const addFriend = async (req, res) => {
    try {
        req.userData.followings.push(req.body.id);
        await req.userData.save();
        const myFollowing = await UserData.findOne({ user_id: req.body.id });
        myFollowing.followers.push(req.user._id);
        await myFollowing.save();
        if (req.userData.followers.includes(req.body.id)) {
            const chat_room = new ChatRoom({});
            await chat_room.save();
            req.userData.my_chat_rooms.push({
                user_id: req.body.id,
                room_id: chat_room._id
            });
            await req.userData.save();
            return res.status(200).json({
                isMutualFriend: true,
                payload: {
                    user_id: req.body.id,
                    room_id: chat_room._id
                }
            })
        }
        res.status(200).json({
            isMutualFriend: false,
            payload: {}
        })

    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = {
    getFriendSuggestion,
    addFriend
}