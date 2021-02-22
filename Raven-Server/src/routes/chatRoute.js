const express = require('express');
const { loadMessages } = require('../controllers/chatController');
const auth = require('../middlewares/auth');

const router = express.Router();

router
    .get('/loadMessages', auth, loadMessages)

module.exports = router;