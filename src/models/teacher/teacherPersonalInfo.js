const mongoose = require('mongoose');

const TpersonalInfoSchema = new mongoose.Schema({
    name:{
        type:String
    },
    regNum:{
        type:String
    },
    batch:{
        type:String
    },
    dept:{
        type:String
    },
    sem:{
        type:String
    },
    sub:{
        type:String
    },
    dob:{
        type:String
    },
    category:{
        type:String
    },
    gender:{
        type:String
    },
    bloodGroup:{
        type:String
    },
    aadhar:{
        type:String
    },
    fatherName:{
        type:String
    },
    motherName:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    address:{
        type:String
    },
    edit:{
        type:String
    }
});

const TeacherPersonalInfo = new mongoose.model("TeacherPersonalInfo",TpersonalInfoSchema);

module.exports= TeacherPersonalInfo;