const express = require("express");
const Router = express.Router();
const TeacherRegister = require("../../models/teacher/teacherRegistration");

Router.route("/studentAttendance")
    .get(async (req, res) => {
        try {
            const teacherRegNum = await TeacherRegister.findOne({ regNum });
            const firstName = teacherRegNum?.firstName;
            const lastName = teacherRegNum?.lastName;

        
            const param = {
                "content": "Student Attendance",
                "firstName": firstName,
                "lastName": lastName
            }

            res.status(200).render("teacher/T-studentAttendance.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })


module.exports = Router;
