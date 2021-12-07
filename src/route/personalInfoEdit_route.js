const express = require("express");
const Router = express.Router();
const rollNumber = require("../app");
const Register = require("../models/userRegistration");
const PersonalInfo = require("../models/personalInfo");


Router.route("/personalInfoEdit")
    .get( async (req, res) => {
        try {
            const userRoll = await Register.findOne({ roll: rollNumber.roll });

            const firstName = userRoll?.firstName;
            const lastName = userRoll?.lastName;
            const gender = userRoll?.gender;
            const email = userRoll?.email;
            const phone = userRoll?.phone;
            const param = {
                "content": "Personal Info",
                "firstName": firstName,
                "lastName": lastName,
                "roll": rollNumber.roll,
                "gender": gender,
                "phone": phone,
                "email": email,
                "msg": req.flash("personalInfoEdit-err")
            };
            res.status(200).render("personalInfoEdit.pug", param);

        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })
    .post(async (req, res) => {


        const personalInfoRoll = await PersonalInfo.findOne({ roll: rollNumber.roll });
        const edit = personalInfoRoll?.edit;

        if (edit == undefined) {

            try {
                const personalInfoEdits = new PersonalInfo({
                    name: req.body.name,
                    email: req.body.email,
                    dept: req.body.dept,
                    roll: req.body.roll,
                    phone: req.body.phone,
                    address: req.body.address,
                    batch: req.body.batch,
                    branch: req.body.branch,
                    sem: req.body.sem,
                    dob: req.body.dob,
                    category: req.body.category,
                    gender: req.body.gender,
                    bloodGroup: req.body.bloodGroup,
                    aadhar: req.body.aadhar,
                    admissionYear: req.body.admissionYear,
                    wbjeeRank: req.body.wbjeeRank,
                    jeletRank: req.body.jeletRank,
                    admissionType: req.body.admissionType,
                    fatherName: req.body.fatherName,
                    motherName: req.body.motherName,
                    edit: "firstTime"
                });

                const personalInfoSubmitted = await personalInfoEdits.save();
                req.flash("personalInfo-success", "Your data has been saved !");
                res.status(200).redirect("/student/personalInfo");
            }
            catch (err) {
                req.flash("personalInfoEdit-err", "Some error occured.Try again !");
                res.status(200).redirect("/student/personalInfoEdit");
                console.log(err);
            }

        }
        else {
            const id = personalInfoRoll?.id;
            const updateDocuments = async (_id) => {
                try {
                    let i = 1;
                    let update = await PersonalInfo.findByIdAndUpdate(
                        { _id },
                        {
                            $set: {
                                name: req.body.name,
                                email: req.body.email,
                                dept: req.body.dept,
                                roll: req.body.roll,
                                phone: req.body.phone,
                                address: req.body.address,
                                batch: req.body.batch,
                                branch: req.body.branch,
                                sem: req.body.sem,
                                dob: req.body.dob,
                                category: req.body.category,
                                gender: req.body.gender,
                                bloodGroup: req.body.bloodGroup,
                                aadhar: req.body.aadhar,
                                admissionYear: req.body.admissionYear,
                                wbjeeRank: req.body.wbjeeRank,
                                jeletRank: req.body.jeletRank,
                                admissionType: req.body.admissionType,
                                fatherName: req.body.fatherName,
                                motherName: req.body.motherName,
                                edit: `updated-${i++}`
                            }
                        },
                        {
                            new: true,
                            useFindAndModify: false
                        }
                    );
                    const updated = await update.save();
                    req.flash("personalInfo-success", "Your data has been saved !");
                    res.status(200).redirect("/student/personalInfo");

                }
                catch (err) {
                    req.flash("personalInfoEdit-err", "Some error occured.Try again !");
                    res.status(200).redirect("/student/personalInfoEdit");
                    console.log(err);
                }

            };

            updateDocuments(id);

        }

    })



module.exports = Router;