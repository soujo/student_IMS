const mongoose = require('mongoose');

const personalInfoSchema= new mongoose.Schema({
    name:{
        type:String,
        uppercase:true
    },
    roll:{ 
        type:String
    },
    batch:{
        type:Number
    },
    branch:{
        type:String,
        uppercase:true
    },
    sem:{
        type:String
    },
    dob:{
        type:String
    },
    category:{
        type:String
    },
    gender:{
        type:String,
        uppercase:true
    },
    bloodGroup:{
        type:String
    },
    aadhar:{
        type:Number
    },
    admissionYear:{
        type:Number
    },
    wbjeeRank:{
        type:Number
    },
    admissionType:{
        type:String,
        uppercase:true
    },
    jeletRank:{
        type:Number
    },
    fatherName:{
        type:String,
        uppercase:true
    },
    motherName:{
        type:String,
        uppercase:true
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    },
    image:{
        type:String
    },
    cloudinary_id:{
        type:String
    },
    edit:{
        type:String
    }
});

const PersonalInfo = new mongoose.model("personalInfo",personalInfoSchema);


module.exports=PersonalInfo; 