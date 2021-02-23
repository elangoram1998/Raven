const express = require('express');
const { loadMessages, updateSeenMsgCount } = require('../controllers/chatController');
const auth = require('../middlewares/auth');

const router = express.Router();

router
    .get('/loadMessages', auth, loadMessages)
    .post('/updateMsgCount', auth, updateSeenMsgCount)

module.exports = router;