const express = require("express");
const Router = express.Router();
const Register = require("../models/userRegistration");
const PersonalInfo = require("../models/personalInfo");
const jwt_decode = require("jwt-decode");
const auth = require("../middleware/auth");

Router.route("/clubs")
    .get(auth,async (req, res) => {
        try {
            const token = req.cookies?.student;
            roll = jwt_decode(token).roll;

            const userRoll = await Register.findOne({ roll });
    
            const firstName = userRoll?.firstName;
            const lastName = userRoll?.lastName;

            const personalInfoRoll = await PersonalInfo.findOne({ roll  });
            const image = personalInfoRoll?.image;
            const param = {
                "content":"Clubs Info",
                "firstName": firstName,
                "lastName": lastName,
                "image":image
            };
            res.status(200).render("clubs.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })


module.exports = Router;