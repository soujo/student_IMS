const express = require("express");
const Router = express.Router();
const TeacherRegister = require("../../models/teacher/teacherRegistration");
const TeacherPersonalInfo = require("../../models/teacher/teacherPersonalInfo");
const Announcement = require("../../models/teacher/teacherAnnouncement");
 
Router.route("/homepage")
    .get( async (req, res) => {
        try {
            const teacherRegNum = await TeacherRegister.findOne({ regNum });
            const firstName = teacherRegNum?.firstName;
            const lastName = teacherRegNum?.lastName;

            const TPersonalInfo = await TeacherPersonalInfo.findOne({ regNum });
            const image = TPersonalInfo?.image;

            const announcements = await Announcement.find({ by:"Admin"});
            let length = announcements?.length;
            
            const param = {
                "content":"Information Management System",
                "firstName": firstName,
                "lastName": lastName,
                "announcementArray":announcements,
                "length":length,
                "image":image,
                "msg":"No announcement from admin"
            };

            res.status(200).render("teacher/T-teacher.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    });



module.exports = Router;