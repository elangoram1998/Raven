const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    notification_type: {
        type: String,
        required: true,
        enum: ['started_following', 'liked']
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

notificationSchema.statics.getMyNotifications = async function (user_id) {
    const notifications = await Notification.find({ receiver: user_id }).populate({
        path: 'sender',
        select: '_id username avatar'
    }).sort({ createdAt: -1 });

    return notifications;
}

// notificationSchema.post('save', async function (next) {
//     const notification = this;
//     const sender = await Notification.findOne({ sender: notification.sender }).populate({
//         path: 'sender',
//         select: '_id username avatar'
//     });
//     global.io.emit(`${req.body.id}-myNotification`, {
//         user_id: sender._id,
//         avatar: req.user.avatar,
//         username: req.user.username
//     });
// })

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = {
    notificationSchema,
    Notification
}