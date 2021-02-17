

const updateUserData = async (req, res) => {
    try {
        console.log(req.body);
        req.userData.liked_post = req.body.userData.liked_post;
        req.userData.saved_post = req.body.userData.saved_post;
        await req.userData.save();
        res.status(200).json({
            'success': 'UserData Successfully Upadted'
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = {
    updateUserData
}