const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: "",
    secretAccessKey: ""
});

const uploadImage = async (filename, data) => {
    const params = {
        Bucket: 'raven-md-store',
        Key: filename,
        Body: data
    }
    const res = await s3.upload(params, (err, data) => {
        if (err) {
            console.log(err);
            throw new Error(err);
        }
    }).promise();
    return res;
}

module.exports = {
    uploadImage
}