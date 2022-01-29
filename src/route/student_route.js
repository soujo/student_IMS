const express = require("express");
const Router = express.Router();
const Register = require("../models/userRegistration");
const PersonalInfo = require("../models/personalInfo");
const TeacherAnnoucement = require("../models/teacher/teacherAnnouncement");

Router.route("/homepage")
    .get( async (req, res) => {
        try {            
            const userRoll = await Register.findOne({ roll });
            const firstName = userRoll?.firstName;
            const lastName = userRoll?.lastName;

            const personalInfoRoll = await PersonalInfo.findOne({ roll });
            const image = personalInfoRoll?.image;

            const announcements = await TeacherAnnoucement.find();
            const param = {
                "content":"Information Management System",
                "firstName": firstName,
                "lastName": lastName,
                "image":image,
                "announcements":announcements,
                "msg":"No announcement from any teacher"
            };

            res.status(200).render("student.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    });



module.exports = Router;