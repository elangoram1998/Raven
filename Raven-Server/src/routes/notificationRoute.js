const express = require('express');
const auth = require('../middlewares/auth');
const { loadNotifications } = require('../controllers/notificationController');

const router = express.Router();

router
    .get('/myNotifications', auth, loadNotifications)

module.exports = router;