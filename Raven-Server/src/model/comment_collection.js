const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String
    },
    total_likes: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
    commentSchema,
    Comment
}