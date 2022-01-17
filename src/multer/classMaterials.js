const multer = require("multer");
const path = require("path");
let i = 1;

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, `../../static/uploads/classMaterials`));
    },
    filename: function (req, file, callback) {
        callback(null, `${regNum}-${i++}` + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        let ext = path.extname(file.originalname);
        if (ext !== '.pdf') {
            return callback(null, false, new Error('Only pdf is allowed'));
        }
        callback(null, true);
    }
});

module.exports = { upload, storage };
