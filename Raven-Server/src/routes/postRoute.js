const express = require('express');
const auth = require('../middlewares/auth');
const { getMyFeed, newPost } = require('../controllers/postController');
const upload = require('../middlewares/multer');
const router = express.Router();

router
    .get('/getMyFeed', auth, upload, getMyFeed)
    .post('/newPost', auth, newPost)

module.exports = router;