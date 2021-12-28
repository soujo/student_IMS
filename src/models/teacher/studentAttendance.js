const mongoose = require('mongoose');

const studentAttendanceSchema = new mongoose.Schema({
    edit:{
        type:Array
    },
    roll: {
        type: Array
    },
    name: {
        type: Array
    },
    sub:{
        type:Array
    },
    sem:{
        type:Array
    },
    totalClass:{
        type:Array
    },
    classAttended:{
        type:Array
    }  

});

const StudentAttendance = new mongoose.model("StudentAttendance", studentAttendanceSchema);

module.exports = StudentAttendance;