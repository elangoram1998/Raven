
const sendNotification = (to, data) => {
    global.io.emit(`${to}-myNotification`, data);
}

const sendChatRoom = (to, data) => {
    global.io.emit(`${to}-newChatRoom`, data);
}

const sendFollow = (to, data) => {
    global.io.emit(`${to}-newFollower`, data);
}

module.exports = {
    sendNotification,
    sendChatRoom,
    sendFollow
}