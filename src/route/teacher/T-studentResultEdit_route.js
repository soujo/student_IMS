const express = require("express");
const Router = express.Router();
const TeacherRegister = require("../../models/teacher/teacherRegistration");
const StudentPersonalInfo = require("../../models/personalInfo");
const TeacherAllocation = require("../../models/admin/teacherAllocation");
const TeacherPersonalInfo = require("../../models/teacher/teacherPersonalInfo");
const StudentResult = require("../../models/teacher/studentResult");
let semOfTeacher;
let subOfTeacher;
let regNum ;
let i=1;


Router.route("/studentResultEdit")
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
                "content": "Student Result",
                "firstName": firstName,
                "lastName": lastName,
                "sub": subOfTeacher,
                "rollArray": rollArr,
                "nameArray": nameArr,
                "length": length,
                "image":image,
                "msg": "No student registered"
            };

            res.status(200).render("teacher/T-studentResultEdit.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })

    .post(async (req, res) => {

        const student = await StudentResult.find({ sem: semOfTeacher , sub : subOfTeacher });
        const id = student[0]?.id;
        const edit = student[0]?.edit;
        
        if (edit === undefined) {
            try {
                const result = new StudentResult({
                    name: req.body.name,
                    roll: req.body.roll,
                    sub: req.body.sub,
                    sem: semOfTeacher,
                    grade: req.body.letterGrade,
                    points: req.body.points,
                    edit: "first"
                });

                const resultUpdate = await result.save();
                res.status(200).redirect("/teacher/studentResult");

            }
            catch (err) {
                res.status(200).redirect("/teacher/studentResult");
            }

        }
        else {

            const updateDocuments = async (_id) => {
                try {
                    const update = await StudentResult.findByIdAndUpdate(
                        { _id },
                        {
                            $set: {
                                name: req.body.name,
                                roll: req.body.roll,
                                sub: req.body.sub,
                                sem: semOfTeacher,
                                grade: req.body.letterGrade,
                                points: req.body.points,
                                edit: `updated-${i++}`
                            }
                        },
                        {
                            new: true,
                            useFindAndModify: false
                        }
                    );

                    const updated = await update.save();
                    res.status(200).redirect("/teacher/studentResult")

                }
                catch (err) {
                    res.status(200).redirect("/teacher/studentResult");
                }
            }

            updateDocuments(id);

        }

    })




module.exports = Router;