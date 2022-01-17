const mongoose = require("mongoose");

const classMaterialsSchema= new mongoose.Schema({
    heading: {
        type: String
    },
    desc: {
        type: String
    },
    by: {
        type: String
    },
    sem:{
        type:String
    },
    pdf:{
        type:String
    },
});

const ClassMaterial = new mongoose.model("ClassMaterial",classMaterialsSchema);
module.exports= ClassMaterial