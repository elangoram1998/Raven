const multer = require('multer');

const upload = multer({
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|mp4)$/)) {
            return cb(new Error('Media format is not valid'));
        }
        cb(undefined, true)
    }
}).single('post');

module.exports = upload;