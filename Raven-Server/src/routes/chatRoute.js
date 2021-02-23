const express = require('express');
const { loadMessages, updateSeenMsgCount, getChatRoomCount, getUpdatedChatRooms } = require('../controllers/chatController');
const auth = require('../middlewares/auth');

const router = express.Router();

router
    .get('/loadMessages', auth, loadMessages)
    .post('/updateMsgCount', auth, updateSeenMsgCount)
    .get('/getChatRoomCount', auth, getChatRoomCount)
    .get('/allUpdatedChatRooms', auth, getUpdatedChatRooms)

module.exports = router;