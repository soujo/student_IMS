const express = require("express");
const Router = express.Router();
const TeacherRegister = require("../../models/teacher/teacherRegistration");
const TeacherAnnoucement = require("../../models/teacher/teacherAnnouncement");

Router.route("/announcement")
    .get(async (req, res) => {
        try {
            const teacherRegNum = await TeacherRegister.findOne({ regNum });
            const firstName = teacherRegNum?.firstName;
            const lastName = teacherRegNum?.lastName;
            const param = {
                "content": "Announcement",
                "firstName": firstName,
                "lastName": lastName
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
                res.status(201).redirect("/teacher/announcement");

            }
            catch (err) {
                res.status(400).send(err);
                console.log(err);
            }

    })



module.exports = Router;