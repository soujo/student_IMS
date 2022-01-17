const express = require("express");
const Router = express.Router();
const TeacherRegister = require("../../models/teacher/teacherRegistration");
const TeacherAllocation = require("../../models/admin/teacherAllocation");
const ClassMaterial = require("../../models/teacher/studentClassMaterials");
const CMImport = require("../../multer/classMaterials");
const upload = CMImport.upload;
let semOfTeacher;
let regNum;

Router.route("/classMaterialsUpload")
    .get (async (req, res) => {
        try {
            const teacherRegNum = await TeacherRegister.findOne({ regNum });
            const firstName = teacherRegNum?.firstName;
            const lastName = teacherRegNum?.lastName;
            const image = `../static/uploads/teacher/${regNum}.jpeg`;


            const param = {
                "content": "Class Materials",
                "firstName": firstName,
                "lastName": lastName,
                "image":image
            };

            res.status(200).render("teacher/T-classMaterials.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })

    .post(upload.array("pdf", 10), async (req, res) => {

        
        try {

            const teachers = await TeacherAllocation.find();
            const regNumArr = teachers[0]?.regNum;
            const semArr = teachers[0]?.sem;

            let index = regNumArr.indexOf(regNum);
            semOfTeacher = semArr[index];
            const materials = new ClassMaterial({
                heading: req.body.heading,
                desc: req.body.desc,
                by: req.body.by,
                sem: semOfTeacher,
                pdf: req.files[0].filename
            })
            const materialsSubmitted = await materials.save();
            res.status(201).redirect("/teacher/classMaterialsUpload");

        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }

    })



module.exports = Router;