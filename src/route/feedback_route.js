const express = require("express");
const Router = express.Router();
const Register = require("../models/userRegistration");
const PersonalInfo = require("../models/personalInfo");
const Feedback=require("../models/feedback");
const auth = require("../middleware/auth");
const jwt_decode = require("jwt-decode");


Router.route("/feedback")
    .get(auth,async (req, res) => { 
        try {
            const token = req.cookies?.student;
            const roll = jwt_decode(token).roll;

            const userRoll = await Register.findOne({ roll });

            const firstName = userRoll?.firstName;
            const lastName = userRoll?.lastName;
            const email = userRoll?.email;

            const personalInfoRoll = await PersonalInfo.findOne({ roll });
            const branch = personalInfoRoll?.branch;
            const image = personalInfoRoll?.image;
            
            const param = {
                "content":"Feedback",
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "dept": branch,
                "roll": roll,
                "image":image,
                "msg":req.flash("feedback-success")
            };

            res.status(200).render("feedback.pug", param);
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
                roll: req.body.roll,
                msg: req.body.msg
            });
            const feedbackSubmitted = await Feedbacks.save();
            req.flash("feedback-success","Thanks for your feedback");
            res.status(200).redirect("/student/feedback");
        }
        catch (err) {

            res.status(400).send(err);
            console.log(err);
        }
    });


module.exports = Router;