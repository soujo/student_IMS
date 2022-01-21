const express = require("express");
const Router = express.Router();
const TeacherRegister = require("../../models/teacher/teacherRegistration");
const TeacherPersonalInfo = require("../../models/teacher/teacherPersonalInfo");
const TeacherAllocation = require("../../models/admin/teacherAllocation");

Router.route("/TpersonalInfo")
    .get( async (req, res) => {
        try {

            const teacherRegNum = await TeacherRegister.findOne({ regNum });

            const firstName = teacherRegNum?.firstName;
            const lastName = teacherRegNum?.lastName;
            const email = teacherRegNum?.email;
            const gender = teacherRegNum?.gender;
            const phone = teacherRegNum?.phone;

            const teacherAllocation = await TeacherAllocation.find();
            let regNumArr =teacherAllocation[0].regNum;
            let deptArr =teacherAllocation[0].dept;
            let semArr =teacherAllocation[0].sem;
            let subArr =teacherAllocation[0].sub;
            let index = regNumArr.indexOf(`${regNum}`);
            const dept = deptArr[index];
            const sem =semArr[index];
            const sub = subArr[index];

            const TpersonalInfoRegNum = await TeacherPersonalInfo.findOne({ regNum });
            const batch = TpersonalInfoRegNum?.batch;
            const dob = TpersonalInfoRegNum?.dob;
            const category = TpersonalInfoRegNum?.category;
            const bloodGroup = TpersonalInfoRegNum?.bloodGroup;
            const aadhar = TpersonalInfoRegNum?.aadhar;
            const fatherName = TpersonalInfoRegNum?.fatherName;
            const motherName = TpersonalInfoRegNum?.motherName;
            const address = TpersonalInfoRegNum?.address;
            const image = TpersonalInfoRegNum?.image;
            
            const param = {
                "content":"Personal Info",
                "firstName": firstName,
                "lastName": lastName,
                "regNum":regNum,
                "batch":batch,
                "dept":dept,
                "sem":sem,
                "sub":sub,
                "dob":dob,
                "category":category,
                "gender":gender,
                "bloodGroup":bloodGroup,
                "aadhar":aadhar,
                "fatherName":fatherName,
                "motherName":motherName,
                "email":email,
                "phone":phone,
                "address":address,
                "image":image,
                "msg":req.flash("personalInfo-success")
            };

            res.status(200).render("teacher/T-personalInfo.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    });



module.exports = Router;