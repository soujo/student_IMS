const express = require("express");
const Router = express.Router();
const TeacherRegister = require("../../models/teacher/teacherRegistration");
const StudentPersonalInfo = require("../../models/personalInfo");
const TeacherAllocation = require("../../models/admin/teacherAllocation");
const TeacherPersonalInfo = require("../../models/teacher/teacherPersonalInfo");
const studentAttendance = require("../../models/teacher/studentAttendance");
const auth = require('../../middleware/authTeacher');
const jwt_decode = require("jwt-decode");
let regNum;

Router.route("/studentAttendance")
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

            const students = await studentAttendance?.find({ sem: semOfTeacher, sub: subOfTeacher });
            let totalClassArr =[];
            let classAttendedArr = [];
            let percentageArr=[];

            if(students.length==0){
                for(let i=0;i<length;i++){
                    totalClassArr[i]=" ";
                    classAttendedArr[i]=" ";   
                    percentageArr[i]=" ";

                }
            }
            else{
                totalClassArr=students[0]?.totalClass;
                classAttendedArr=students[0]?.classAttended;
                for(let i=0;i<totalClassArr.length;i++){
                    percentageArr[i]=(classAttendedArr[i]/totalClassArr[i])*100;
                }
            }

            const TPersonalInfo = await TeacherPersonalInfo.findOne({ regNum });
            const image = TPersonalInfo?.image;


            const param = {
                "content": "Student Attendance",
                "firstName": firstName,
                "lastName": lastName,                
                "sub": subOfTeacher,
                "rollArray": rollArr,
                "nameArray": nameArr,
                "totalClassArray": totalClassArr,
                "classAttendedArray": classAttendedArr,
                "percentageArray":percentageArr,
                "length": length,
                "msg": "No student registered",
                "image":image,
                "success":req.flash("attendance-success")
            }

            res.status(200).render("teacher/T-studentAttendance.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })


module.exports = Router;
