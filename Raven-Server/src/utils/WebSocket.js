

class WebSocket {
    connection(socket) {
        console.log("new connection occured");

        socket.on('disconnect', () => {
            console.log('connection disconnected');
        })
    }
}

module.exports = new WebSocket();