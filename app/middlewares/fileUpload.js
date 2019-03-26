const multer = require('multer');
const path = require('path');

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname.toLowerCase()));
    }
});

// Init Upload
const upload = multer({
    storage: storage

})



module.exports = {
    upload
}