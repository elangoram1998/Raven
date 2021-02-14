const express = require('express');
const auth = require('../middlewares/auth');
const { getMyFeed } = require('../controllers/postController');
const router = express.Router();

router
    .get('/getMyFeed', auth, getMyFeed);

module.exports = router;