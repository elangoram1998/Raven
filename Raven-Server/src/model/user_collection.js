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
    resetPassword: {
        code: {
            type: String
        },
        token: {
            type: String
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


userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.statics.findUserByCredentials = async function (username, password) {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Account is not available');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Username/Password is incorrect');
    }
    return user;
}

userSchema.statics.isUsernameExist = async (username) => {
    const user = await User.findOne({ username });
    if (user) {
        return true;
    }
    return false;
}

userSchema.methods.generateToken = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id.toString() }, config.get('tokenKey'));
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

userSchema.methods.generateResetToken = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id.toString() }, config.get('resetKey'));
    user.resetPassword.token = token;
    await user.save();
    return token;
}

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

const User = mongoose.model('User', userSchema);

module.exports = {
    userSchema,
    User
}