
const uniqueArray = (toBeNewArray, excludeArray) => {
    excludeArray.forEach(profile => {
        if (!toBeNewArray.inclueds(profile._id)) {
            toBeNewArray.push(profile);
        }
    });
    return toBeNewArray;
}

const excludeMyFriends = (myFriends, allUsers) => {
    const newArray = [];
    allUsers.forEach(user => {
        if (!myFriends.inclueds(user._id)) {
            newArray.push(user);
        }
    });
    return newArray;
}

module.exports = {
    uniqueArray,
    excludeMyFriends
}