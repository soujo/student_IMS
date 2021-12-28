const express = require("express");
const Router = express.Router();
const TeacherRegister = require("../../models/teacher/teacherRegistration");
const StudentAttendance = require("../../models/teacher/studentAttendance");

Router.route("/studentAttendanceEdit")
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

            res.status(200).render("teacher/T-studentAttendanceEdit.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })

    .post(async (req, res) => {

            try {
                const attendance = new StudentAttendance({
                    name: req.body.name,
                    roll: req.body.roll,
                    sub: req.body.sub,
                    sem: semOfTeacher,
                    totalClass: req.body.totalClass,
                    classAttended: req.body.classAttended,
                });

                const attendanceUpdate = await attendance.save();
                res.status(200).redirect("/teacher/studentAttendance");

            }
            catch (err) {
                res.status(400).send(err);
                console.log(err);
            }
    })

module.exports = Router;
