const express = require("express");
const Router = express.Router();
const TeacherRegister = require("../../models/teacher/teacherRegistration");


Router.route("/feedback")
    .get(async (req, res) => {
        try {
            const teacherRegNum = await TeacherRegister.findOne({ regNum });
            const firstName = teacherRegNum?.firstName;
            const lastName = teacherRegNum?.lastName;
            const email = teacherRegNum?.email;

            const param = {
                "content": "Class Materials",
                "firstName": firstName,
                "lastName": lastName,
                "email":email,
                "roll":regNum
            };

            res.status(200).render("teacher/T-feedback.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })


module.exports = Router;