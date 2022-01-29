const express = require("express");
const Router = express.Router();
const TeacherRegister = require("../../models/teacher/teacherRegistration");
const TeacherAllocation = require("../../models/admin/teacherAllocation");
const TeacherPersonalInfo = require("../../models/teacher/teacherPersonalInfo");
const ClassMaterial = require("../../models/teacher/studentClassMaterials");
const CMImport = require("../../multer/classMaterials");
const upload = CMImport.upload;
const auth = require('../../middleware/authTeacher');
const jwt_decode = require("jwt-decode");
let semOfTeacher;
let regNum;

Router.route("/classMaterialsUpload")
    .get(auth, async (req, res) => {
        try {
            const token = req.cookies?.teacher;
            regNum = jwt_decode(token).regNum;

            const teacherRegNum = await TeacherRegister.findOne({ regNum });
            const firstName = teacherRegNum?.firstName;
            const lastName = teacherRegNum?.lastName;

            const TPersonalInfo = await TeacherPersonalInfo.findOne({ regNum });
            const image = TPersonalInfo?.image;


            const param = {
                "content": "Class Materials",
                "firstName": firstName,
                "lastName": lastName,
                "image":image,
                "msg": req.flash("upload-success"),
                "err": req.flash("upload-error")
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
            req.flash("upload-success", "Class material is uploaded !");
            res.status(201).redirect("/teacher/classMaterialsUpload");

        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }

    })



module.exports = Router;