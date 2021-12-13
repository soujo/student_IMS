const mongoose = require('mongoose');
const feedbackSchema= new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    }, 
    dept:{
        type:String
    },
    roll:{
        type:Number
    },
    msg:{
        type:String
    }
});

const Feedback= new mongoose.model("Feedback",feedbackSchema);

module.exports=Feedback;
