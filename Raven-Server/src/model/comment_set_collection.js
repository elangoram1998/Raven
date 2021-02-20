const mongoose = require('mongoose');
const { Comment, commentSchema } = require('./comment_collection');

const commentSetSchema = new mongoose.Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    replys: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { timestamps: true });

const CommentSet = mongoose.model('CommentSet', commentSetSchema);

module.exports = {
    commentSetSchema,
    CommentSet
}