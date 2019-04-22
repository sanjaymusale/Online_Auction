const multer = require('multer');
const path = require('path');
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk');

AWS.config.loadFromPath('./config/awsConfig.json');
//need to create a aws configuration json fileError
// {
// "accessKeyId": "your aws key here",
// "secretAccessKey": "your access key here",
// "region": "us-east-1"
// }
//save it in awsConfig.json file

const s3 = new AWS.S3();


// Set The Storage Engine to store in your localhost machine
// const storage = multer.diskStorage({
//     destination: './public/uploads/',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname.toLowerCase()));
//     }
// });

// Init Upload setting the configuration of S3 aws
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'my-auction',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null,file.fieldname +'-'+ Date.now().toString()+path.extname(file.originalname.toLowerCase()))
        }
    })

})



module.exports = {
    upload
}
