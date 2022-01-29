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
            const DSC = achievementsRoll?.clubs[0] == null ? "" : achievementsRoll?.clubs[0].toString();
            const SAC = achievementsRoll?.clubs[1] == null ? "" : achievementsRoll?.clubs[1].toString();
            const riyaz = achievementsRoll?.clubs[2] == null ? "" : achievementsRoll?.clubs[2].toString();
            const elysium = achievementsRoll?.clubs[3] == null ? "" : achievementsRoll?.clubs[3].toString();
            const chitrank = achievementsRoll?.clubs[4] == null ? "" : achievementsRoll?.clubs[4].toString();
            const infinitio = achievementsRoll?.clubs[5] == null ? "" : achievementsRoll?.clubs[5].toString();
            const litmus = achievementsRoll?.clubs[6] == null ? "" : achievementsRoll?.clubs[6].toString();
            const ecell = achievementsRoll?.clubs[7] == null ? "" : achievementsRoll?.clubs[7].toString();
            const quiz = achievementsRoll?.clubs[8] == null ? "" : achievementsRoll?.clubs[8].toString();
            const shutterburg = achievementsRoll?.clubs[9] == null ? "" : achievementsRoll?.clubs[9].toString();
            const robotics = achievementsRoll?.clubs[10] == null ? "" : achievementsRoll?.clubs[10].toString();

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
                "clubs": [`${DSC} ${SAC} ${riyaz} ${elysium} ${chitrank} ${infinitio} ${litmus} ${ecell} ${quiz} ${shutterburg} ${robotics}`],
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
