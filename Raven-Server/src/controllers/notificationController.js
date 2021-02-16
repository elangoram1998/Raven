const { Notification } = require('../model/notification_collection');

const loadNotifications = async (req, res) => {
    try {console.log(res.user)
        const myNotification = await Notification.getMyNotifications(req.user._id);
        res.status(200).send(myNotification);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = {
    loadNotifications
}