const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({

    heading: {
        type: String
    },
    desc: {
        type: String
    },
    by: {
        type: String
    }

});

const TeacherAnnoucement = new mongoose.model("Announcement", announcementSchema);
module.exports = TeacherAnnoucement;

