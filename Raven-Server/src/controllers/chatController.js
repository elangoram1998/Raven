const { ChatRoom } = require('../model/chat_room');


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

    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = {
    loadMessages,
    updateSeenMsgCount
}