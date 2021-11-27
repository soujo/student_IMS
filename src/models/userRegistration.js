const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({ 
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
        unique: true
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
    roll: {
        type: Number,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    }
});


const Register = new mongoose.model("Student", studentSchema);

module.exports = Register;