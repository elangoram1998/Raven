const mongoose = require('mongoose');
const moment = require('moment');

const postSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    original_name: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        maxLength: 1000
    },
    media_type: {
        type: String,
        required: true,
        enum: ['image', 'video']
    },
    aws_key_name: {
        type: String,
        required: true,
        unique: true
    },
    storage_url: {
        type: String,
        required: true,
    },
    total_likes: {
        type: Number,
        default: 0
    },
    total_comments: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

postSchema.statics.getMyFeed = async function (usersArray) {
    const feed = await Post.find({
        'user_id': {
            $in: usersArray
        },
        'createdAt': {
            $gte: moment().startOf('day').toDate(),
            $lte: moment.defaultFormat()
        }
    }).populate({
        path: 'user_id',
        select: '_id username avatar'
    }).select('-aws_key_name').sort({ createdAt: -1 });

    return feed;
}

module.exports = {
    postSchema,
    Post
}