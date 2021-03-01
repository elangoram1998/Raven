const express = require('express');
const auth = require('../middlewares/auth');
const { loadNotifications, updateNotificationStatus } = require('../controllers/notificationController');

const router = express.Router();

router
    .get('/myNotifications', auth, loadNotifications)
    .put('/updateStatus', auth, updateNotificationStatus)

module.exports = router;