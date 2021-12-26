const express = require("express");
const Router = express.Router();
const TeacherRegister = require("../../models/teacher/teacherRegistration");
const Feedback=require("../../models/feedback");


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
                "roll":regNum,
                "msg":req.flash("Tfeedback-success")
            };

            res.status(200).render("teacher/T-feedback.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })

    .post(async (req, res) => {

        try {
            const Feedbacks = new Feedback({
                name: req.body.name,
                email: req.body.email,
                dept: req.body.dept,
                roll: req.body.roll, //As this is the same model as student so roll is basically regNum 
                msg: req.body.msg
            });
            const feedbackSubmitted = await Feedbacks.save();
            req.flash("Tfeedback-success","Thanks for your feedback");
            res.status(200).redirect("/teacher/feedback");
        }
        catch (err) {

            res.status(400).send(err);
            console.log(err);
        }

    })



module.exports = Router;