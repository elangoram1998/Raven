const express = require('express');
const { getFriendSuggestion, addFriend } = require('../controllers/suggestionController');
const auth = require('../middlewares/auth');
const router = express.Router();

router
    .get('/getFriendSuggestion', auth, getFriendSuggestion)
    .post('/addFriend', auth, addFriend)

module.exports = router;