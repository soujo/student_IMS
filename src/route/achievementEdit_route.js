const express = require("express");
const Router = express.Router();
const rollNumber = require("../app");
const Register = require("../models/userRegistration");
const Achievement = require("../models/achievements");

Router.route("/achievementsEdit")
    .get( async (req, res) => {

        try {
            const userRoll = await Register.findOne({ roll: rollNumber.roll });

            const firstName = userRoll?.firstName;
            const lastName = userRoll?.lastName;
            const image = `../static/uploads/${rollNumber.roll}.jpeg`;
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


        const achievementRoll = await Achievement.findOne({ roll: rollNumber.roll });
        const edit = achievementRoll?.edit;

        if (edit == undefined) {

            try {

                let achieveObjects = [];
                for (let i = 0; i < req.body.category.length; i++) {
                    achieveObjects.push({
                        category: req.body.category[i],
                        achievements_item: req.body.achievements_item[i],
                        description_text: req.body.description_text[i],
                    });
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
                    roll: rollNumber.roll,
                    achievement: achieveObjects,
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

                    let achieveObjects = [];
                    for (let i = 0; i < req.body.category.length; i++) {
                        achieveObjects.push({
                            category: req.body.category[i],
                            achievements_item: req.body.achievements_item[i],
                            description_text: req.body.description_text[i],
                        });
                    }

                    let j = 1;
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
                                roll: rollNumber.roll,
                                achievement: achieveObjects,
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
                }

            };

            updateDocuments(id);
        }

    })


module.exports = Router;
