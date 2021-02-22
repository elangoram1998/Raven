const chalk = require('chalk');
const { Message } = require('../model/message_collection');
const { ChatRoom } = require('../model/chat_room');
//Colored console message functions
const error = chalk.underline.red.bold;
const success = chalk.underline.green.bold;
const warning = chalk.keyword('orange');

class WebSocket {
    connection(socket) {
        console.log(success("Web Socket new connection has been occured"));

        socket.on('join', ({ roomId }) => {
            socket.join(roomId);
            /*global.io.to(roomId).emit('message', `welcome to my chat ${roomId}`);*/
        })

        socket.on('sendMessage', async ({ room, message, userId }, callback) => {
            const messageCollection = new Message({
                user_id: userId,
                text: message
            });
            await messageCollection.save();
            const chat = await ChatRoom.findById({ _id: room });
            chat.messages.push(messageCollection);
            await chat.save();
            const response = await Message.findById({ _id: messageCollection._id }).populate({
                path: 'user_id',
                select: '_id username avatar'
            });
            global.io.to(room).emit('message', response);
            callback("message send successfully");
        })

        socket.on('disconnect', () => {
            console.log(warning("Web Socket connection disconnected"));
        })
    }
}

module.exports = new WebSocket();