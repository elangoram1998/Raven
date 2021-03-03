const { User } = require('../model/user_collection');
const { UserData } = require('../model/user_data_collection');
const sendEmail = require('../utils/nodemailer');

const register = async (req, res) => {
    try {
        console.log(req.body);
        const isUsernameExist = await User.isUsernameExist(req.body.username);
        if (isUsernameExist) {
            return res.status(400).send('Username already taken, please try another username');
        }
        const user = new User(req.body);
        await user.save();
        const userData = new UserData({
            user_id: user._id
        });
        await userData.save();

        // Send Mail functionality
        var toAdress = user.email;
        var subject = "Welcome Message";
        var text = `Thank you ${user.username} for signing up with my application.`;
        var html = `<!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">
            <style>
            .card {
                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                transition: 0.3s;
                width: 40%;
                text-align:center;
                margin-left:30%;
              }
              
              .card:hover {
                box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
              }
              
              .container {
                padding: 2px 16px;
              }

              .card-title{
                font-family: 'Lobster', cursive;
              }
              .card-body{
                font-family: 'Fredoka One', cursive;
              }
            </style>
          </head>
          <body>
            <div class="card">
                <div class="container">
                    <h2 class="card-title><b>Hello ${user.username}</b></h2> 
                    <p class="card-body>Thank you for signing up with Raven. Enjoy using this application😉</p> 
                </div>
            </div>
          </body>
        </html>`;
        const messageId = sendEmail(toAdress, subject, text, html);
        if (!messageId) {
            console.log('Failed to send email');
        }
        //
        res.status(200).send(true);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            'Error': e
        });
    }
}

const login = async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findUserByCredentials(req.body.username, req.body.password);
        const userData = await UserData.findOne({ user_id: user._id }).populate({
            path: 'my_chat_rooms.user_id',
            select: '_id username avatar',
            model: 'User'
        })
        const token = await user.generateToken();
        res.status(200).json({
            user,
            userData,
            token
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token != req.token);
        await req.user.save();
        res.status(200).send(true);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const test = async (req, res) => {
    try {

    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = {
    register,
    login,
    logout
}