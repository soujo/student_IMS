const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

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


studentSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 4);
        this.confirmPassword = await bcrypt.hash(this.confirmPassword, 4);
    }
    next();
});

const Register = new mongoose.model("Student", studentSchema);

module.exports = Register;