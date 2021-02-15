const mongoose = require('mongoose');
const { messageSchema } = require('./message_collection');

const chatSchema = new mongoose.Schema({
    messages: [messageSchema]
}, { timestamps: true });

const ChatRoom = mongoose.model('ChatRoom', chatSchema);

module.exports = {
    chatSchema,
    ChatRoom
}