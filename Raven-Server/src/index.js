const express = require('express');
const cors = require('cors');
const config = require('config');
const chalk = require('chalk');
const http = require('http');
const socketio = require('socket.io');

//sub modules
require('./database/mongoDB');
const authRouter = require('./routes/authRoute');
const friendSuggestionRouter = require('./routes/suggestionRoute');
const postRouter = require('./routes/postRoute');
const notificationRouter = require('./routes/notificationRoute');
const userRouter = require('./routes/userRoute');
const commentRouter = require('./routes/commentRoute');
const WebSocket = require('./utils/WebSocket');

const app = express();
const server = http.createServer(app);
const success = chalk.underline.green.bold;
app.use(express.json());
app.use(cors({
    origin: config.get('cors.origin')
}));

global.io = socketio(server, {
    cors: {
        origin: 'http://localhost:4200'
    }
})

io.on('connection', WebSocket.connection)
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/friendSuggestion', friendSuggestionRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/user', userRouter);
app.use('/api/comment', commentRouter);

const PORT = process.env.PORT || config.get('server.port');

server.listen(PORT, () => {
    console.log(success(`Application is currently running on port: ${PORT}`));
});