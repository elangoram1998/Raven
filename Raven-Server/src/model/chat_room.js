const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

});

const ChatRoom = mongoose.model('ChatRoom', chatSchema);

module.exports = {
    chatSchema,
    ChatRoom
}