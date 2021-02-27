const express = require('express');
const { UserData } = require('../model/user_data_collection');
const { updateUserData, getMyPosts } = require('../controllers/userController');
const auth = require('../middlewares/auth');

const router = express.Router();

router
    .post('/updateUserData', auth, updateUserData)
    .get('/getMyPosts', auth, getMyPosts)

module.exports = router;