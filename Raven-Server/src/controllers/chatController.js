const { ChatRoom } = require('../model/chat_room');
const { UserData } = require('../model/user_data_collection');
const { getMessageCount } = require('../utils/uniqueArray');

const loadMessages = async (req, res) => {
    try {
        const id = req.query.roomId;
        const chat = await ChatRoom.findById({ _id: id }).populate({
            path: 'messages.user_id',
            select: '_id username avatar'
        }).select('messages');
        res.status(200).send(chat.messages);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const updateSeenMsgCount = async (req, res) => {
    try {
        const id = req.query.roomId;
        req.userData.my_chat_rooms.forEach(room => {
            if (room.room_id == id) {
                room.total_seen_messages = req.body.count;
            }
        });
        await req.userData.save();
        res.status(200).send({
            'success': 'Count Updated'
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const getChatRoomCount = async (req, res) => {
    try {
        const id = req.query.roomId;
        const count = await ChatRoom.findById({ _id: id });
        console.log(count);
        const length = (count.messages.length).toString();
        res.status(200).send(length);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const getUpdatedChatRooms = async (req, res) => {
    try {
        req.userData.my_chat_rooms.forEach(async (room) => {
            const totalCount = await getMessageCount(room.room_id);
            console.log("minus: " + (totalCount - room.total_seen_messages))
            room.unseenMsg = (totalCount- room.total_seen_messages)
        });
        await req.userData.save();
        await req.userData.save();
        const userData = await UserData.findOne({ user_id: req.user._id }).populate({
            path: 'my_chat_rooms.user_id',
            select: '_id username avatar',
            model: 'User'
        });
        res.status(200).send(userData.my_chat_rooms);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = {
    loadMessages,
    updateSeenMsgCount,
    getChatRoomCount,
    getUpdatedChatRooms
}