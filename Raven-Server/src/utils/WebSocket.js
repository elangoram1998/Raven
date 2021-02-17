const chalk = require('chalk');

//Colored console message functions
const error = chalk.underline.red.bold;
const success = chalk.underline.green.bold;
const warning = chalk.keyword('orange');

class WebSocket {
    connection(socket) {
        console.log(success("Web Socket new connection has been occured"));

        socket.on('disconnect', () => {
            console.log(warning("Web Socket connection disconnected"));
        })
    }
}

module.exports = new WebSocket();