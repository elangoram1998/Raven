
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

module.exports = {
    uniqueArray,
    excludeMyFriends
}