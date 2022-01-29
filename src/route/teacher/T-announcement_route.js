const express = require("express");
const Router = express.Router();
const TeacherRegister = require("../../models/teacher/teacherRegistration");
const TeacherAnnoucement = require("../../models/teacher/teacherAnnouncement");
const TeacherPersonalInfo = require("../../models/teacher/teacherPersonalInfo");
const auth = require('../../middleware/authTeacher');
const jwt_decode = require("jwt-decode");

Router.route("/announcement")
    .get(auth,async (req, res) => {
        try {
            const token = req.cookies?.teacher;
            const regNum = jwt_decode(token).regNum;

            const teacherRegNum = await TeacherRegister.findOne({ regNum });
            const firstName = teacherRegNum?.firstName;
            const lastName = teacherRegNum?.lastName;

            const TPersonalInfo = await TeacherPersonalInfo.findOne({ regNum });
            const image = TPersonalInfo?.image;
            
            const param = {
                "content": "Announcement",
                "firstName": firstName,
                "lastName": lastName,
                "image":image,
                "msg":req.flash("announcement-success")
            };

            res.status(200).render("teacher/T-announcement.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })

    .post(async (req, res) => {

            try {

                const annoucements = new TeacherAnnoucement({
                    heading:req.body.heading,
                    desc:req.body.desc,
                    by:req.body.by
                })

                const annoucementSubmitted = await annoucements.save();
                req.flash("announcement-success","Your announcement is posted !");
                res.status(201).redirect("/teacher/announcement");

            }
            catch (err) {
                res.status(400).send(err);
                console.log(err);
            }

    })



module.exports = Router;