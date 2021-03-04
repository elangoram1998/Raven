const express = require('express');
const { login, register, logout, sendVerificationCode, verifyCode, resetPassword } = require('../controllers/authController');
const auth = require('../middlewares/auth');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router
    .post('/register', register)
    .post('/login', login)
    .post('/logout', auth, logout)
    .post('/sendCode', sendVerificationCode)
    .post('/verifyCode', verifyCode)
    .post('/resetPassword', validateToken, resetPassword)

module.exports = router;