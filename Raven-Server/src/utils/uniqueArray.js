const { ChatRoom } = require('../model/chat_room');

const uniqueArray = (toBeNewArray, excludeArray) => {
    excludeArray.forEach(profile => {
        if (!toBeNewArray.includes(profile._id)) {
            toBeNewArray.push(profile);
        }
    });
    return toBeNewArray;
}

const excludeMyFriends = (myFriends, allUsers) => {
    const newArray = [];
    allUsers.forEach(user => {
        if (!myFriends.includes(user._id)) {
            newArray.push(user);
        }
    });
    return newArray;
}

const getMessageCount = async (roomId) => {
    const count = await ChatRoom.findById({ _id: roomId });
    return count.messages.length
}

module.exports = {
    uniqueArray,
    excludeMyFriends,
    getMessageCount
}