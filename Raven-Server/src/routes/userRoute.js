const express = require('express');
const {
    updateUserData,
    getMyPosts,
    getMySavedPosts,
    changeProfilePic,
    removeProfilePic,
    editProfile,
    changePassword,
    getUsersData,
    updateUserFollowings,
    viewProfile } = require('../controllers/userController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/multer');

const router = express.Router();

router
    .post('/updateUserData', auth, updateUserData)
    .get('/getMyPosts', auth, getMyPosts)
    .get('/getMySavedPosts', auth, getMySavedPosts)
    .post('/changeProfilePic', auth, upload, changeProfilePic)
    .post('/removeProfilePic', auth, removeProfilePic)
    .put('/editProfile', auth, editProfile)
    .put('/changePassword', auth, changePassword)
    .post('/getUsersData', auth, getUsersData)
    .put('/updateFollowings', auth, updateUserFollowings)
    .get('/viewProfile', auth, viewProfile)

module.exports = router;