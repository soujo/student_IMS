const mongoose = require("mongoose");

const timetableSchema= new mongoose.Schema({
    heading: {
        type: String
    },
    pdf:{
        type:String
    }
});

const Timetable = new mongoose.model("Timetable",timetableSchema);
module.exports= Timetable