const express = require("express");
const Router = express.Router();
const TeacherRegister = require("../../models/teacher/teacherRegistration");
const StudentPersonalInfo = require("../../models/personalInfo");
const TeacherAllocation = require("../../models/admin/teacherAllocation");
const TeacherPersonalInfo = require("../../models/teacher/teacherPersonalInfo");
const StudentResult = require("../../models/teacher/studentResult");
let regNum;

Router.route("/studentResult")
    .get(async (req, res) => {
        try {

            const teacherRegNum = await TeacherRegister.findOne({ regNum });
            const firstName = teacherRegNum?.firstName;
            const lastName = teacherRegNum?.lastName;

            const teachers = await TeacherAllocation.find();
            const regNumArr = teachers[0]?.regNum;
            const semArr = teachers[0]?.sem;
            const subArr = teachers[0]?.sub;

            let index = regNumArr.indexOf(regNum);
            let semOfTeacher = semArr[index];
            let subOfTeacher = subArr[index];

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


            const students = await StudentResult?.find({ sem: semOfTeacher, sub: subOfTeacher });
            let gradeArr = [];
            let pointsArr = [];

            if (students.length == 0) {
                for (let i = 0; i < length; i++) {
                    gradeArr[i] = " ";
                    pointsArr[i] = " ";
                }
            }
            else {
                gradeArr = students[0]?.grade;
                pointsArr = students[0]?.points;
            }


            const param = {
                "content": "Student Result",
                "firstName": firstName,
                "lastName": lastName,
                "sub": subOfTeacher,
                "rollArray": rollArr,
                "nameArray": nameArr,
                "gradeArray": gradeArr,
                "pointsArray": pointsArr,
                "length": length,
                "image": image,
                "msg": "No student registered",
                "success": req.flash("result-success")
            };

            res.status(200).render("teacher/T-studentResult.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })




module.exports = Router;