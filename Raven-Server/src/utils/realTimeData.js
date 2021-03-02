
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

const removeFollower = (to, data) => {
    global.io.emit(`${to}-removeFollower`, data);
}

const removeChatRoom = (to, data) => {
    global.io.emit(`${to}-removeChatRoom`, data);
}

module.exports = {
    sendNotification,
    sendChatRoom,
    sendFollow,
    likeCount,
    removeFollower,
    removeChatRoom
}