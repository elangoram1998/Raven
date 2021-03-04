const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/assets/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + '.png')
    }
})

const upload = multer({
    //storage: storage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|mp4)$/)) {
            return cb(new Error('Media format is not valid'));
        }
        cb(undefined, true)
    }
}).single('post');

module.exports = upload;