const express = require('express');
const auth = require('../middlewares/auth');
const { getMyFeed, newPost, updatePost, deletePost } = require('../controllers/postController');
const upload = require('../middlewares/multer');
const router = express.Router();

router
    .get('/getMyFeed', auth, getMyFeed)
    .post('/newPost', auth, upload, newPost)
    .post('/updatePost', auth, updatePost)
    .delete('/deletePost', auth, deletePost)

module.exports = router;