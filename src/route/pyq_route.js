const express = require("express");
const Router = express.Router();
const Register = require("../models/userRegistration");
const PersonalInfo = require("../models/personalInfo");
const auth = require("../middleware/auth");
const jwt_decode = require("jwt-decode");

Router.route("/pyq")
    .get(auth,async (req, res) => {

        try {
            const token = req.cookies?.student;
            const roll = jwt_decode(token).roll;

            const userRoll = await Register.findOne({ roll});

            const firstName = userRoll?.firstName;
            const lastName = userRoll?.lastName;

            const personalInfoRoll = await PersonalInfo.findOne({ roll  });
            const image = personalInfoRoll?.image;

            const param = {
                "content":"Previous Year Questions",
                "firstName": firstName,
                "lastName": lastName,
                "image":image
            };
            res.status(200).render("pyq.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })






module.exports = Router;