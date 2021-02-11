const express = require('express');
const cors = require('cors');
const config = require('config');
const chalk = require('chalk');

//sub modules
require('./database/mongoDB');

const app = express();
const success = chalk.underline.green.bold;
app.use(express.json());
app.use(cors({
    origin: config.get('cors.origin')
}));

const PORT = process.env.PORT || config.get('server.port');

app.listen(PORT, () => {
    console.log(success(`Application is currently running on port: ${PORT}`));
});