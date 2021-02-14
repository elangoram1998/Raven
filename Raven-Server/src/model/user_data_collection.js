const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bio: {
        type: String,
        maxLength: 400
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    followings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    liked_post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    my_chat_rooms: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        room_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ChatRoom',
        }
    }]
}, { timestamps: true });

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = {
    userDataSchema,
    UserData
}