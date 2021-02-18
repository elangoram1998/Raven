const { CommentSet } = require('../model/comment_set_collection');
const { Comment } = require('../model/comment_collection');
const { Post } = require('../model/post_collection');

const getMyComments = async (req, res) => {
    try {
        const post_id = req.query.pId;
        const comments = await Comment.find({ post_id }).populate({
            path: 'comment.user_id',
            select: '_id username avatar'
        }).populate({
            path: 'replys.user_id',
            select: '_id username avatar'
        });
        res.status(200).send(comments);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const addComment = async (req, res) => {
    try {

    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const addReply = async (req, res) => {
    try {

    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const likeComment = async (req, res) => {
    try {

    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = {
    getMyComments,
    addComment,
    addReply,
    likeComment
}