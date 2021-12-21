const express = require("express");
const Router = express.Router();
Router.route("/homepage")
    .get( async (req, res) => {
        try {
            const teacherRegNum = await TeacherRegister.findOne({ regNum });
            const firstName = teacherRegNum?.firstName;
            const lastName = teacherRegNum?.lastName;

            const param = {
                "content":"Information Management System",
                "firstName": firstName,
                "lastName": lastName
            };

            res.status(200).render("teacher/T-teacher.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    });



module.exports = Router;