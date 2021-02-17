const express = require('express');
const { UserData } = require('../model/user_data_collection');
const { updateUserData } = require('../controllers/userController');
const auth = require('../middlewares/auth');

const router = express.Router();

router
    .post('/updateUserData', auth, updateUserData)

module.exports = router;