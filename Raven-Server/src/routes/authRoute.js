const express = require('express');
const { login, register, logout } = require('../controllers/authController');
const auth = require('../middlewares/auth');

const router = express.Router();

router
    .post('/register', register)
    .post('/login', login)
    .post('/logout', auth, logout)

module.exports = router;