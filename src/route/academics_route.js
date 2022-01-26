const express = require("express");
const Router = express.Router();
const Register = require("../models/userRegistration");
const PersonalInfo = require("../models/personalInfo");
const Academics = require("../models/academics");

Router.route("/academics")
    .get(async (req, res) => {

        try {
            
            const userRoll = await Register.findOne({ roll });

            const firstName = userRoll?.firstName;
            const lastName = userRoll?.lastName;

            const personalInfoRoll = await PersonalInfo.findOne({ roll });
            const branch = personalInfoRoll?.branch;
            const image = personalInfoRoll?.image;

            const academicsRoll = await Academics.findOne({ roll });

            const secondaryDegreeName = academicsRoll?.secondaryDegreeName;
            const secondaryBoardName = academicsRoll?.secondaryBoardName;
            const secondaryInstituteName = academicsRoll?.secondaryInstituteName;
            const secondaryPassingYear = academicsRoll?.secondaryPassingYear;
            const secondaryObtainedMarks = academicsRoll?.secondaryObtainedMarks;
            const secondaryTotalMarks = academicsRoll?.secondaryTotalMarks;
            const secondaryTotalCGPA = academicsRoll?.secondaryTotalCGPA;
            const secondaryTotalPercentage = academicsRoll?.secondaryTotalPercentage;
            const secondaryDivision = academicsRoll?.secondaryDivision;
            const secondarySpecialization = academicsRoll?.secondarySpecialization;
            const seniorSecondaryDegreeName = academicsRoll?.seniorSecondaryDegreeName;
            const seniorSecondaryBoardName = academicsRoll?.seniorSecondaryBoardName;
            const seniorSecondaryInstituteName = academicsRoll?.seniorSecondaryInstituteName;
            const seniorSecondaryPassingYear = academicsRoll?.seniorSecondaryPassingYear;
            const seniorSecondaryObtainedMarks = academicsRoll?.seniorSecondaryObtainedMarks;
            const seniorSecondaryTotalMarks = academicsRoll?.seniorSecondaryTotalMarks;
            const seniorSecondaryTotalCGPA = academicsRoll?.seniorSecondaryTotalCGPA;
            const seniorSecondaryTotalPercentage = academicsRoll?.seniorSecondaryTotalPercentage;
            const seniorSecondaryDivision = academicsRoll?.seniorSecondaryDivision;
            const seniorSecondarySpecialization = academicsRoll?.seniorSecondarySpecialization;
            const collegePassingYear = academicsRoll?.collegePassingYear;
            const collegeObtainedMarks = academicsRoll?.collegeObtainedMarks;
            const collegeTotalMarks = academicsRoll?.collegeTotalMarks;
            const collegeTotalCGPA = academicsRoll?.collegeTotalCGPA;
            const collegeTotalPercentage = academicsRoll?.collegeTotalPercentage;
            const collegeDivision = academicsRoll?.collegeDivision;
        
            const params = {
                "content":"Academics",
                "firstName": firstName,
                "lastName": lastName,
                "branch": branch,
                "secondaryDegreeName": secondaryDegreeName,
                "secondaryBoardName": secondaryBoardName,
                "secondaryInstituteName": secondaryInstituteName,
                "secondaryPassingYear": secondaryPassingYear,
                "secondaryObtainedMarks": secondaryObtainedMarks,
                "secondaryTotalMarks": secondaryTotalMarks,
                "secondaryTotalCGPA": secondaryTotalCGPA,
                "secondaryTotalPercentage": secondaryTotalPercentage,
                "secondaryDivision": secondaryDivision,
                "secondarySpecialization": secondarySpecialization,
                "seniorSecondaryDegreeName": seniorSecondaryDegreeName,
                "seniorSecondaryBoardName": seniorSecondaryBoardName,
                "seniorSecondaryInstituteName": seniorSecondaryInstituteName,
                "seniorSecondaryPassingYear": seniorSecondaryPassingYear,
                "seniorSecondaryObtainedMarks": seniorSecondaryObtainedMarks,
                "seniorSecondaryTotalMarks": seniorSecondaryTotalMarks,
                "seniorSecondaryTotalCGPA": seniorSecondaryTotalCGPA,
                "seniorSecondaryTotalPercentage": seniorSecondaryTotalPercentage,
                "seniorSecondaryDivision": seniorSecondaryDivision,
                "seniorSecondarySpecialization": seniorSecondarySpecialization,
                "collegePassingYear": collegePassingYear,
                "collegeObtainedMarks": collegeObtainedMarks,
                "collegeTotalMarks": collegeTotalMarks,
                "collegeTotalCGPA": collegeTotalCGPA,
                "collegeTotalPercentage": collegeTotalPercentage,
                "collegeDivision": collegeDivision,
                "image":image,
                "msg":req.flash("academicsEdit-success")
            };

            res.status(200).render("academics.pug", params);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })




module.exports=Router;