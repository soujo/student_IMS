const express = require("express");
const Router = express.Router();
const Register = require("../models/userRegistration");
const PersonalInfo = require("../models/personalInfo");
const auth = require("../middleware/auth");
const jwt_decode = require("jwt-decode");

Router.route("/personalInfo")
    .get(auth,async(req,res)=>{
        try{
            const token = req.cookies?.student;
            const roll = jwt_decode(token).roll;

            const userRoll = await Register.findOne({ roll });

            const firstName = userRoll?.firstName;
            const lastName = userRoll?.lastName;
            const gender = userRoll?.gender;
            const email = userRoll?.email;
            const phone = userRoll?.phone;
    
            const personalInfoRoll = await PersonalInfo.findOne({ roll });
    
            const batch = personalInfoRoll?.batch;
            const branch = personalInfoRoll?.branch;
            const sem = personalInfoRoll?.sem;
            const dob = personalInfoRoll?.dob;
            const category = personalInfoRoll?.category;
            const bloodGroup = personalInfoRoll?.bloodGroup;
            const aadhar = personalInfoRoll?.aadhar;
            const admissionYear = personalInfoRoll?.admissionYear;
            const wbjeeRank = personalInfoRoll?.wbjeeRank;
            const admissionType = personalInfoRoll?.admissionType;
            const jeletRank = personalInfoRoll?.jeletRank;
            const fatherName = personalInfoRoll?.fatherName;
            const motherName = personalInfoRoll?.motherName;
            const address = personalInfoRoll?.address;
            const image = personalInfoRoll?.image;
            
            const param = {
                "content":"Personal Info",
                "firstName": firstName,
                "lastName": lastName,
                "roll": roll,
                "gender": gender,
                "phone": phone,
                "email": email,
                "batch": batch,
                "branch": branch,
                "sem":sem,
                "dob": dob,
                "category": category,
                "bloodGroup": bloodGroup,
                "aadhar": aadhar,
                "admissionYear": admissionYear,
                "wbjeeRank": wbjeeRank,
                "admissionType": admissionType,
                "jeletRank": jeletRank,
                "fatherName": fatherName,
                "motherName": motherName,
                "address": address,
                "image":image,
                "msg":req.flash("personalInfo-success")
            }
            res.status(200).render("personalInfo.pug", param);
        }
        catch(err){            
        res.status(400).send(err);
        console.log(err);
        }
    })




module.exports=Router;