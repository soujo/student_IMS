const mongoose = require('mongoose');

const teacherAllocationSchema = new mongoose.Schema({

    Tname: {
        type: Array,
        uppercase: true
    },
    regNum: {
        type: Array
    },
    dept: {
        type: Array,
        uppercase: true
    },
    sem: {
        type: Array
    },
    sub: {
        type: Array
    },
    edit: {
        type: Array
    }
});

const TeacherAllocation = new mongoose.model("TeacherAllocation", teacherAllocationSchema);
module.exports = TeacherAllocation;