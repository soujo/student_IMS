const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        uppercase: true
    },
    lastName: {
        type: String,
        required: true,
        uppercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index:true,
        sparse:true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true

    },
    confirmPassword: {
        type: String,
        required: true

    },
    regNum: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    }
});


const TeacherRegister = new mongoose.model("Teacher", teacherSchema);

module.exports = TeacherRegister;