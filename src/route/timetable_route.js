const express = require("express");
const Router = express.Router();
const Register = require("../models/userRegistration");
const PersonalInfo = require("../models/personalInfo");
const Timetable = require("../models/admin/timetable");
const jwt_decode = require("jwt-decode");
const auth = require("../middleware/auth");

Router.route("/timetable")
    .get(auth, async (req, res) => {
        try {
            const token = req.cookies?.student;
            const roll = jwt_decode(token).roll;

            const userRoll = await Register.findOne({ roll });

            const firstName = userRoll?.firstName;
            const lastName = userRoll?.lastName;

            const personalInfoRoll = await PersonalInfo.findOne({ roll });
            const image = personalInfoRoll?.image;

            const timetable = await Timetable?.find();
            const pdf = timetable[0]?.pdf;

            const link = "../static/uploads/admin/";
            const param = {
                "content": "Timetable",
                "firstName": firstName,
                "lastName": lastName,
                "image": image,
                "pdf": pdf,
                "link": link,
                "msg": "No file has been uploaded by admin"
            };
            res.status(200).render("timetable.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })


module.exports = Router;