const multer = require("multer"); 
const path = require("path");
const rollNumber= require("../app");


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname,"../../static/uploads"));
    },
    filename: function (req, file, callback) {
        callback(null, rollNumber.roll+path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100000
    },
    fileFilter: function (req, file, callback) {
        let ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'));
        }
        callback(null, true);
    }
});

module.exports={upload,storage};