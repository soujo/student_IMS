const mongoose = require('mongoose');

const studentResultSchema = new mongoose.Schema({
    edit: {
        type: Array
    },
    roll: {
        type: Array
    },
    name: {
        type: Array
    },
    sub: {
        type: Array
    },
    sem: {
        type: Array
    },
    grade: {
        type: Array
    },
    points: {
        type: Array
    }

});

const studentResult = new mongoose.model("StudentResult", studentResultSchema);

module.exports = studentResult;