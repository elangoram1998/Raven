const express = require('express');
const auth = require('../middlewares/auth');
const { addComment, addReply, getMyComments, likeComment } = require('../controllers/commentController');
const router = express.Router();

router
    .get('/getPostComments', auth, getMyComments)
    .post('/addComment', auth, addComment)
    .post('/addReply', auth, addReply)
    .post('/likeComment', auth, likeComment)

module.exports = router;