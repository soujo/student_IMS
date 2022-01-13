const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, `../../static/uploads/admin`));
    },
    filename: function (req, file, callback) {
        callback(null, "timetable" + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        let ext = path.extname(file.originalname);
        if (ext !== '.pdf') {
            return callback(new Error('Only pdf is allowed'));
        }
        callback(null, true);
    }
});

module.exports = { upload, storage };
