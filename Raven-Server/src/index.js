const express = require('express');
const cors = require('cors');
const config = require('config');
const chalk = require('chalk');

//sub modules
require('./database/mongoDB');
const authRouter = require('./routes/authRoute');
const friendSuggestionRouter = require('./routes/suggestionRoute');
const postRouter = require('./routes/postRoute');

const app = express();
const success = chalk.underline.green.bold;
app.use(express.json());
app.use(cors({
    origin: config.get('cors.origin')
}));

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/friendSuggestion', friendSuggestionRouter);

const PORT = process.env.PORT || config.get('server.port');

app.listen(PORT, () => {
    console.log(success(`Application is currently running on port: ${PORT}`));
});