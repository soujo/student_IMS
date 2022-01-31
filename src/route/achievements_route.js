const express = require("express");
const Router = express.Router();
const Register = require("../models/userRegistration");
const PersonalInfo = require("../models/personalInfo");
const Achievement = require("../models/achievements");
const auth = require("../middleware/auth");
const jwt_decode = require("jwt-decode");
let roll;

Router.route("/achievements")
    .get(auth,async (req, res) => {

        try {

            const token = req.cookies?.student;
            roll = jwt_decode(token).roll;

            const userRoll = await Register.findOne({ roll });

            const firstName = userRoll?.firstName;
            const lastName = userRoll?.lastName;

            const achievementsRoll = await Achievement.findOne({ roll });

            const hobbies = achievementsRoll?.hobbies;
            const sports = achievementsRoll?.sports;
            const language = achievementsRoll?.language;

            const club1 = achievementsRoll?.clubs[0] == null ? "" : achievementsRoll?.clubs[0].toString();
            const club2 = achievementsRoll?.clubs[0] == null ? "" : achievementsRoll?.clubs[0].toString();
            const club3 = achievementsRoll?.clubs[0] == null ? "" : achievementsRoll?.clubs[0].toString();
            const club4 = achievementsRoll?.clubs[0] == null ? "" : achievementsRoll?.clubs[0].toString();
            const club5 = achievementsRoll?.clubs[0] == null ? "" : achievementsRoll?.clubs[0].toString();
            const club6 = achievementsRoll?.clubs[0] == null ? "" : achievementsRoll?.clubs[0].toString();
            

            const achievement = achievementsRoll?.achievement;

            const personalInfoRoll = await PersonalInfo.findOne({ roll });
            const image = personalInfoRoll?.image;
            
            const params = {
                "content":"Achievements",
                "firstName": firstName,
                "lastName": lastName,
                "hobbies": hobbies,
                "sports": sports,
                "language": language,
                "clubs": [`${club1} ${club2} ${club3} ${club4} ${club5} ${club6}`],
                "achievement": achievement,
                "msg": "No Achievements Added",
                "success_msg":req.flash("achievementsEdit-success"),
                "image":image
            };

            res.status(200).render("achievements.pug", params);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })


module.exports = Router;
