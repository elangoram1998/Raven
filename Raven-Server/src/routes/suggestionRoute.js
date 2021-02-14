const express = require('express');
const { getFriendSuggestion } = require('../controllers/suggestionController');
const auth = require('../middlewares/auth');
const router = express.Router();

router
    .get('/getFriendSuggestion', auth, getFriendSuggestion)

module.exports = router;