const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const config = require('config');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    avatar: {
        type: String,
        default: config.get('s3.defaultProfilePic'),
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value) || !validator.matches(value, '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
                throw new Error('Email is invalid')
            }
        }
    },
    profile_type: {
        type: String,
        required: true,
        default: 'private',
        enum: ['private', 'public']
    },
    user_type: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin']
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.matches(value, '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')) {
                throw new Error('Password is invalid');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},
    { timestamps: true, });

const User = mongoose.model('User', userSchema);

module.exports = {
    userSchema,
    User
}