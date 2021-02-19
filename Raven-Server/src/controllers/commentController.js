const { CommentSet } = require('../model/comment_set_collection');
const { Comment } = require('../model/comment_collection');
const { Post } = require('../model/post_collection');

const getMyComments = async (req, res) => {
    try {
        const post_id = req.query.pId;
        const comments = await CommentSet.find({ post_id }).populate({
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
        const comment = new Comment({
            user_id: req.user._id,
            text: req.body.text
        });
        await comment.save();
        const commentSet = new CommentSet({
            post_id: req.body.postId,
            comment: comment
        });
        await commentSet.save();
        const post = await Post.findById({ _id: req.body.postId });
        post.total_comments += 1;
        await post.save();
        const response = await CommentSet.findById({ _id: commentSet._id }).populate({
            path: 'comment.user_id',
            select: '_id username avatar'
        })
        res.status(200).send(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const addReply = async (req, res) => {
    try {
        const comment = new Comment({
            user_id: req.user._id,
            text: req.body.text
        });
        await comment.save();
        const commentSet = await CommentSet.findById({ _id: req.body.commentSetId });
        commentSet.replys.push(comment);
        await commentSet.save();
        const post = await Post.findById({ _id: req.body.postId });
        post.total_comments += 1;
        await post.save();
        const response = await Comment.findById({ _id: comment._id }).populate({
            path: 'user_id',
            select: '_id username avatar'
        })
        res.status(200).send(response);
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