const express = require("express");
const Router = express.Router();
const Register = require("../models/userRegistration");
const PersonalInfo = require("../models/personalInfo");
const Academics = require("../models/academics");
const auth = require("../middleware/auth");
const jwt_decode = require("jwt-decode");
let roll;

Router.route("/academicsEdit")
    .get(auth,async (req, res) => {
        try {

            const token = req.cookies?.student;
            roll = jwt_decode(token).roll;

            const userRoll = await Register.findOne({ roll });

            const firstName = userRoll?.firstName;
            const lastName = userRoll?.lastName;

            const personalInfoRoll = await PersonalInfo.findOne({ roll });
            const branch = personalInfoRoll?.branch;
            const image = personalInfoRoll?.image;
            
            const params = {
                "content":"Academics",
                "firstName": firstName,
                "lastName": lastName,
                "branch": branch,
                "image":image,
                "msg": req.flash("academicsEdit-err")
            };

            res.status(200).render("academicsEdit.pug", params);
        }
        catch (err) {
            console.log(err);
        }
    })
    .post(async (req, res) => {


        const academicsRoll = await Academics.findOne({ roll });
        const edit = academicsRoll?.edit;

        if (edit == undefined) {

            try {
                const academicsEdits = new Academics({
                    secondaryDegreeName: req.body.secondaryDegreeName,
                    secondaryBoardName: req.body.secondaryBoardName,
                    secondaryInstituteName: req.body.secondaryInstituteName,
                    secondaryPassingYear: req.body.secondaryPassingYear,
                    secondaryObtainedMarks: req.body.secondaryObtainedMarks,
                    secondaryTotalMarks: req.body.secondaryTotalMarks,
                    secondaryTotalCGPA: req.body.secondaryTotalCGPA,
                    secondaryTotalPercentage: req.body.secondaryTotalPercentage,
                    secondaryDivision: req.body.secondaryDivision,
                    secondarySpecialization: req.body.secondarySpecialization,
                    seniorSecondaryDegreeName: req.body.seniorSecondaryDegreeName,
                    seniorSecondaryBoardName: req.body.seniorSecondaryBoardName,
                    seniorSecondaryInstituteName: req.body.seniorSecondaryInstituteName,
                    seniorSecondaryPassingYear: req.body.seniorSecondaryPassingYear,
                    seniorSecondaryObtainedMarks: req.body.seniorSecondaryObtainedMarks,
                    seniorSecondaryTotalMarks: req.body.seniorSecondaryTotalMarks,
                    seniorSecondaryTotalCGPA: req.body.seniorSecondaryTotalCGPA,
                    seniorSecondaryDivision: req.body.seniorSecondaryDivision,
                    seniorSecondarySpecialization: req.body.seniorSecondarySpecialization,
                    collegePassingYear: req.body.collegePassingYear,
                    collegeObtainedMarks: req.body.collegeObtainedMarks,
                    collegeTotalMarks: req.body.collegeTotalMarks,
                    collegeTotalCGPA: req.body.collegeTotalCGPA,
                    collegeTotalPercentage: req.body.collegeTotalPercentage,
                    collegeDivision: req.body.collegeDivision,
                    branch: req.body.branch,
                    roll: rollNumber.roll,
                    edit: "firstTime"
                });

                const academicsEditSubmitted = await academicsEdits.save();
                req.flash("academicsEdit-success", "Your data has been saved !");
                res.status(200).redirect("/student/academics");


            }
            catch (err) {
                req.flash("personalInfoEdit-err", "Some error occured.Try again !");
                res.status(200).redirect("/student/academicsEdit");
            }

        }
        else {

            const id = academicsRoll?.id;
            const updateDocuments = async (_id) => {
                try {
                    let i = 1;
                    let update = await Academics.findByIdAndUpdate(
                        { _id },
                        {
                            $set: {
                                secondaryDegreeName: req.body.secondaryDegreeName,
                                secondaryBoardName: req.body.secondaryBoardName,
                                secondaryInstituteName: req.body.secondaryInstituteName,
                                secondaryPassingYear: req.body.secondaryPassingYear,
                                secondaryObtainedMarks: req.body.secondaryObtainedMarks,
                                secondaryTotalMarks: req.body.secondaryTotalMarks,
                                secondaryTotalCGPA: req.body.secondaryTotalCGPA,
                                secondaryTotalPercentage: req.body.secondaryTotalPercentage,
                                secondaryDivision: req.body.secondaryDivision,
                                secondarySpecialization: req.body.secondarySpecialization,
                                seniorSecondaryDegreeName: req.body.seniorSecondaryDegreeName,
                                seniorSecondaryBoardName: req.body.seniorSecondaryBoardName,
                                seniorSecondaryInstituteName: req.body.seniorSecondaryInstituteName,
                                seniorSecondaryPassingYear: req.body.seniorSecondaryPassingYear,
                                seniorSecondaryObtainedMarks: req.body.seniorSecondaryObtainedMarks,
                                seniorSecondaryTotalMarks: req.body.seniorSecondaryTotalMarks,
                                seniorSecondaryTotalCGPA: req.body.seniorSecondaryTotalCGPA,
                                seniorSecondaryDivision: req.body.seniorSecondaryDivision,
                                seniorSecondarySpecialization: req.body.seniorSecondarySpecialization,
                                collegePassingYear: req.body.collegePassingYear,
                                collegeObtainedMarks: req.body.collegeObtainedMarks,
                                collegeTotalMarks: req.body.collegeTotalMarks,
                                collegeTotalCGPA: req.body.collegeTotalCGPA,
                                collegeTotalPercentage: req.body.collegeTotalPercentage,
                                collegeDivision: req.body.collegeDivision,
                                branch: req.body.branch,
                                roll: rollNumber.roll,
                                edit: `updated-${i++}`
                            }
                        },
                        {
                            new: true,
                            useFindAndModify: false
                        }
                    );
                    const updated = await update.save();
                    req.flash("academicsEdit-success", "Your data has been saved !");
                    res.status(200).redirect("/student/academics");

                }
                catch (err) {
                    req.flash("personalInfoEdit-err", "Some error occured.Try again !");
                    res.status(200).redirect("/student/academicsEdit");
                }

            };

            updateDocuments(id);
        }
    })


module.exports = Router;
