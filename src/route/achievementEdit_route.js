const express = require("express");
const Router = express.Router();
const Register = require("../models/userRegistration");
const PersonalInfo = require("../models/personalInfo");
const Achievement = require("../models/achievements");
const auth = require("../middleware/auth");
const jwt_decode = require("jwt-decode");
let roll;
let j = 1;

Router.route("/achievementsEdit")
    .get(auth, async (req, res) => {

        try {
            const token = req.cookies?.student;
            roll = jwt_decode(token).roll;

            const userRoll = await Register.findOne({ roll });

            const firstName = userRoll?.firstName;
            const lastName = userRoll?.lastName;

            const personalInfoRoll = await PersonalInfo.findOne({ roll });
            const image = personalInfoRoll?.image;
            
            const params = {
                "content": "Achievements",
                "firstName": firstName,
                "lastName": lastName,
                "image": image,
                "msg": req.flash("achievementsEdit-err")
            };

            res.status(200).render("achievementsEdit.pug", params);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })
    .post(async (req, res) => {


        const achievementRoll = await Achievement.findOne({ roll });
        const edit = achievementRoll?.edit;

        if (edit == undefined) {

            try {

                let achievementArr = [];
                if(typeof(req.body.category) == "string"){

                    achievementArr.push({
                        category:req.body.category,
                        achievements_item:req.body.achievements_item,
                        description_text:req.body.description_text
                    });
                }
                else{

                    for (let i = 0; i < req.body.category.length; i++) {
                        achievementArr.push({
                            category: req.body.category[i],
                            achievements_item: req.body.achievements_item[i],
                            description_text: req.body.description_text[i],
                        });
                    }
                }
                
                const achievements = new Achievement({
                    hobbies: req.body.hobbies,
                    language: req.body.language,
                    sports: req.body.sports,
                    clubs: [
                        req.body.DSC,
                        req.body.SAC,
                        req.body.riyaz,
                        req.body.elysium,
                        req.body.chitrank,
                        req.body.infinitio,
                        req.body.litmus,
                        req.body.ecell,
                        req.body.quiz,
                        req.body.shutterburg,
                        req.body.robotics
                    ],
                    roll: roll,
                    achievement: achievementArr,
                    edit: "firstTime"
                });
                const achievementsSubmitted = await achievements.save();
                req.flash("achievementsEdit-success", "Your data has been saved !");
                res.status(200).redirect("/student/achievements");


            }
            catch (err) {
                req.flash("achievementsEdit-err", "Some error occured.Try again !");
                res.status(200).redirect("/student/achievementsEdit");
            }

        }
        else {

            const id = achievementRoll?.id;
            const updateDocuments = async (_id) => {
                try {

                    let achievementArr = [];

                    if(typeof(req.body.category)== "string"){

                        achievementArr.push({
                            category:req.body.category,
                            achievements_item:req.body.achievements_item,
                            description_text:req.body.description_text
                        });
                    }
                    else{

                        for (let i = 0; i < req.body.category.length; i++) {
                            achievementArr.push({
                                category: req.body.category[i],
                                achievements_item: req.body.achievements_item[i],
                                description_text: req.body.description_text[i],
                            });
                        }
                    }

                    let update = await Achievement.findByIdAndUpdate(
                        { _id },
                        {
                            $set: {
                                hobbies: req.body.hobbies,
                                language: req.body.language,
                                sports: req.body.sports,
                                clubs: [
                                    req.body.DSC,
                                    req.body.SAC,
                                    req.body.riyaz,
                                    req.body.elysium,
                                    req.body.chitrank,
                                    req.body.infinitio,
                                    req.body.litmus,
                                    req.body.ecell,
                                    req.body.quiz,
                                    req.body.shutterburg,
                                    req.body.robotics
                                ],
                                roll: roll,
                                achievement: achievementArr,
                                edit: `updated-${j++}`
                            }
                        },
                        {
                            new: true,
                            useFindAndModify: false
                        }
                    );
                    const updated = await update.save();
                    req.flash("achievementsEdit-success", "Your data has been saved !");
                    res.status(200).redirect("/student/achievements");

                }
                catch (err) {
                    req.flash("achievementsEdit-err", "Some error occured.Try again !");
                    res.status(200).redirect("/student/achievementsEdit");
                    console.log(err);
                }

            };

            updateDocuments(id);
        }

    })


module.exports = Router;
