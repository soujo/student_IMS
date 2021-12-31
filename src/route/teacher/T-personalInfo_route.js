const express = require("express");
const Router = express.Router();
const TeacherRegister = require("../../models/teacher/teacherRegistration");


Router.route("/TpersonalInfo")
    .get( async (req, res) => {
        try {
            const teacherRegNum = await TeacherRegister.findOne({ regNum });

            const firstName = teacherRegNum?.firstName;
            const lastName = teacherRegNum?.lastName;
            const email = teacherRegNum?.email;
            const gender = teacherRegNum?.gender;
            const phone = teacherRegNum?.phone;

           
            const param = {
                "content":"Personal Info",
                "firstName": firstName,
                "lastName": lastName,
                "regNum":regNum,
                "gender":gender,
                "email":email,
                "phone":phone,
            };

            res.status(200).render("teacher/T-personalInfo.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    });



module.exports = Router;