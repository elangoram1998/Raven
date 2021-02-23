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
    saved_post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    liked_comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    my_chat_rooms: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        room_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ChatRoom',
        },
        total_seen_messages: {
            type: Number,
            default: 0
        },
        unseenMsg: {
            type: Number,
            default: 0
        }
    }]
}, { timestamps: true });

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = {
    userDataSchema,
    UserData
}