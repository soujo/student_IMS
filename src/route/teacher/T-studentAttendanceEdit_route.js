const express = require("express");
const Router = express.Router();
const TeacherRegister = require("../../models/teacher/teacherRegistration");
const StudentPersonalInfo = require("../../models/personalInfo");
const TeacherAllocation = require("../../models/admin/teacherAllocation");
const StudentAttendance = require("../../models/teacher/studentAttendance");
const TeacherPersonalInfo = require("../../models/teacher/teacherPersonalInfo");
const auth = require('../../middleware/authTeacher');
const jwt_decode = require("jwt-decode");
let semOfTeacher;
let subOfTeacher;

Router.route("/studentAttendanceEdit")
    .get(auth,async (req, res) => {
        try {
            const token = req.cookies?.teacher;
            regNum = jwt_decode(token).regNum;

            const teacherRegNum = await TeacherRegister.findOne({ regNum });
            const firstName = teacherRegNum?.firstName;
            const lastName = teacherRegNum?.lastName;
            
            const teachers = await TeacherAllocation.find();
            const regNumArr = teachers[0]?.regNum;
            const semArr = teachers[0]?.sem;
            const subArr = teachers[0]?.sub;

            let index = regNumArr.indexOf(regNum);
            semOfTeacher = semArr[index];
            subOfTeacher = subArr[index];

            const studentsArr = await StudentPersonalInfo.find({ sem: semOfTeacher });

            let nameArr = new Array;
            let rollArr = new Array;

            for (let i in studentsArr) {
                nameArr.push(studentsArr[i].name)
                rollArr.push(studentsArr[i].roll)
            }
            let length = nameArr?.length;

            const TPersonalInfo = await TeacherPersonalInfo.findOne({ regNum });
            const image = TPersonalInfo?.image;

            const param = {
                "content": "Student Attendance",
                "firstName": firstName,
                "lastName": lastName,
                "sub": subOfTeacher,
                "rollArray": rollArr,
                "nameArray": nameArr,
                "length": length,
                "image":image,
                "msg": "No student registered",
                "error":req.flash("attendance-error")
            }

            res.status(200).render("teacher/T-studentAttendanceEdit.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })

    .post(async (req, res) => {

        const student = await StudentAttendance.find({ sem: semOfTeacher , sub : subOfTeacher });
        const id = student[0]?.id;
        const edit = student[0]?.edit;

        if (edit === undefined) {

            try {
                const attendance = new StudentAttendance({
                    name: req.body.name,
                    roll: req.body.roll,
                    sub: req.body.sub,
                    sem: semOfTeacher,
                    totalClass: req.body.totalClass,
                    classAttended: req.body.classAttended,
                    edit:"first"
                });

                const attendanceUpdate = await attendance.save();
                req.flash("attendance-success","Student Attendance is uploaded !");
                res.status(200).redirect("/teacher/studentAttendance");

            }
            catch (err) {
                req.flash("attendance-error","Try again after some time !");
                res.status(200).redirect("/teacher/studentAttendance");
            }

        }
        else{

            const updateDocuments = async (_id) => {
                try {
                    let i=1;
                    const attendance = await StudentAttendance.findByIdAndUpdate(
                        { _id },
                        {
                            $set: {
                                name: req.body.name,
                                roll: req.body.roll,
                                sub: req.body.sub,
                                sem: semOfTeacher,
                                totalClass: req.body.totalClass,
                                classAttended: req.body.classAttended,
                                edit: `${i++}`
                            }
                        },
                        {
                            new: true,
                            useFindAndModify: false
                        }
                    );

                    const attendanceUpdate = await attendance.save();
                    req.flash("attendance-success","Student Attendance is uploaded !");
                    res.status(200).redirect("/teacher/studentAttendance");
    
                }
                catch (err) {
                    req.flash("attendance-error","Try again after some time !");
                    res.status(200).redirect("/teacher/studentAttendance");
                }
            }

            updateDocuments(id);

        }
            
    })

module.exports = Router;
