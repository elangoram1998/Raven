const { Notification } = require('../model/notification_collection');

const loadNotifications = async (req, res) => {
    try {
        console.log(res.user)
        const myNotification = await Notification.getMyNotifications(req.user._id);
        res.status(200).send(myNotification);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const updateNotificationStatus = async (req, res) => {
    try {
        const notifyArray = req.body;
        const response = await Notification.updateMany(
            {
                _id: {
                    $in: notifyArray,
                }
            },
            {
                $set: {
                    status: true
                }
            }
        );
        console.log(response);
        res.status(200).send(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).send();
    }
}

module.exports = {
    loadNotifications,
    updateNotificationStatus
}