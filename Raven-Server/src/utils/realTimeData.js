
const sendNotification = (to, data) => {
    global.io.emit(`${to}-myNotification`, data);
}

const sendChatRoom = (to, data) => {
    global.io.emit(`${to}-newChatRoom`, data);
}

const sendFollow = (to, data) => {
    global.io.emit(`${to}-newFollower`, data);
}

const likeCount = (to, data) => {
    global.io.emit(`${to}-likeNotification`, data);
}

module.exports = {
    sendNotification,
    sendChatRoom,
    sendFollow,
    likeCount
}