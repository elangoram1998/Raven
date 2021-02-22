const chalk = require('chalk');

//Colored console message functions
const error = chalk.underline.red.bold;
const success = chalk.underline.green.bold;
const warning = chalk.keyword('orange');

class WebSocket {
    connection(socket) {
        console.log(success("Web Socket new connection has been occured"));

        socket.on('join', ({roomId}) => {
            socket.join(roomId);
            global.io.to(roomId).emit('message', `welcome to my chat ${roomId}`);
        })

        socket.on('sendMessage', async({ room, message }, callback) => {
            console.log(room + " " + message);
            // const messages = new Message({
            //     text: message
            // });
            // await messages.save();
            // const chat = await Chat.findById({ _id: room });
            // chat.messages.push(messages);
            // await chat.save();
            global.io.to(room).emit('message', message);
            callback("message send successfully");
        })

        socket.on('disconnect', () => {
            console.log(warning("Web Socket connection disconnected"));
        })
    }
}

module.exports = new WebSocket();