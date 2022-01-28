const express = require("express");
const Router = express.Router();
const Register = require("../models/userRegistration");
const PersonalInfo = require("../models/personalInfo");
const StudentResult = require("../models/teacher/studentResult");
const grade = ["O", "E", "A", "B", "C", "D", "F", "I"];
const points = [10, 9, 8, 7, 6, 5, 2, 2];

const subCodeArr_1st = [
    "BSCH101",
    "BSM102",
    "ESEE101",
    "BSCH191",
    "ESEE191",
    "ESME191"
]
const subjectArr_1st = [
    "Chemistry-I (Gr-B)",
    "Mathematics-IB",
    "Basic Electrical Engineering",
    "Chemistry-I Laboratory (Gr-B)",
    "Basic Electrical Engineering Laboratory",
    "Engineering Graphics & Design (Gr-B)"
]
const creditArr_1st = [4, 4, 4, 1.5, 1, 3];

//****************** */
const subCodeArr_2nd = [
    "BSPH201",
    "BSM202",
    "ESCS201",
    "HMHU201",
    "BSPH291",
    "ESCS291",
    "ESME292",
    "HMHU291",
]
const subjectArr_2nd = [
    "Physics-I (Gr-B)",
    "Mathematics-IIB",
    "Programming for Problem Solving",
    "English",
    "Physics-I Laboratory (Gr-B)",
    "Programming for Problem Solving Laboratory",
    "Workshop Manufacturing Practices (Gr-B)",
    "Language Laboratory"
]
const creditArr_2nd = [4, 4, 3, 2, 1.5, 2, 3, 1];

//****************** */
const subCodeArr_3rd = [
    "PCEE301",
    "PCEE302",
    "PCEE303",
    "ESME301",
    "BSM301",
    "BSEE301",
    "MCEE301",
    "PCCS391",
    "PCEE391",
    "PCEE392",
]
const subjectArr_3rd = [
    "Electric Circuit Theory",
    "Analog Electronics",
    "Elctromagnetic Field Theory",
    "Engineering Mechanics",
    "Mathematics-III",
    "Biology For Engineers",
    "Indian Constitution",
    "Numerical Methods Laboratory",
    "Circuit Theory Laboratory",
    "Analog Electronics Laboratory"
]
const creditArr_3rd = [4, 3, 3, 3, 3, 3, 0, 1, 1, 1];

Router.route("/result")
    .get( async (req, res) => {
        try {

            const userRoll = await Register.findOne({ roll });

            const firstName = userRoll?.firstName;
            const lastName = userRoll?.lastName;

            const personalInfoRoll = await PersonalInfo.findOne({ roll });
            const image = personalInfoRoll?.image;

            //*For 1st sem
            const students_1st = await StudentResult?.find({ sem: "1st" });

            let rollArr_1st = students_1st[0]?.roll;
            let index_1st = rollArr_1st?.indexOf(userRoll?.roll);
            let subArr_1st = [];
            let gradeArr_1st = [];
            let pointsArr_1st = [];
            let creditPointsArr_1st = [];
            for (let i = 0; i < students_1st.length; i++) {
                subArr_1st.push(students_1st[i].sub[index_1st]);
                gradeArr_1st.push(students_1st[i].grade[index_1st]);
            }
            let length_1st = subArr_1st?.length;

            let BSCH101_grade = gradeArr_1st[subArr_1st?.indexOf("Chemistry-I (Gr-B)")] == undefined ? "" : gradeArr_1st[subArr_1st.indexOf("Chemistry-I (Gr-B)")];
            let BSM102_grade = gradeArr_1st[subArr_1st?.indexOf("Mathematics-IB")] == undefined ? "" : gradeArr_1st[subArr_1st.indexOf("Mathematics-IB")];
            let ESEE101_grade = gradeArr_1st[subArr_1st?.indexOf("Basic Electrical Engineering")] == undefined ? "" : gradeArr_1st[subArr_1st.indexOf("Basic Electrical Engineering")];
            let BSCH191_grade = gradeArr_1st[subArr_1st?.indexOf("Chemistry-I Laboratory (Gr-B)")] == undefined ? "" : gradeArr_1st[subArr_1st.indexOf("Chemistry-I Laboratory (Gr-B)")];
            let ESEE191_grade = gradeArr_1st[subArr_1st?.indexOf("Basic Electrical Engineering Laboratory")] == undefined ? "" : gradeArr_1st[subArr_1st.indexOf("Basic Electrical Engineering Laboratory")];
            let ESME191_grade = gradeArr_1st[subArr_1st?.indexOf("Engineering Graphics & Design (Gr-B)")] == undefined ? "" : gradeArr_1st[subArr_1st.indexOf("Engineering Graphics & Design (Gr-B)")];

            //* 1st sem grade array
            let newGradeArr_1st = [BSCH101_grade, BSM102_grade, ESEE101_grade, BSCH191_grade, ESEE191_grade, ESME191_grade];

            //*1st sem points array            
            for (let i = 0; i < newGradeArr_1st.length; i++) {
                let index = grade.indexOf(newGradeArr_1st[i]);
                if (index == -1) {
                    pointsArr_1st.push("");
                }
                else {
                    pointsArr_1st.push(points[index]);
                }
            }

            //*1st sem credit points array           

            for (let i = 0; i < newGradeArr_1st.length; i++) {
                if (pointsArr_1st[i] == "") {
                    creditPointsArr_1st.push("")
                } else {
                    creditPointsArr_1st.push(pointsArr_1st[i] * creditArr_1st[i]);
                }
            }

            //**************************************************** */

            //*For 2nd sem

            const students_2nd = await StudentResult?.find({ sem: "2nd" });
            let rollArr_2nd = students_2nd[0]?.roll;
            let index_2nd = rollArr_2nd?.indexOf(userRoll?.roll);
            let subArr_2nd = [];
            let gradeArr_2nd = [];
            let pointsArr_2nd = [];
            let creditPointsArr_2nd = [];

            for (let i = 0; i < students_2nd.length; i++) {
                subArr_2nd.push(students_2nd[i].sub[index_2nd]);
                gradeArr_2nd.push(students_2nd[i].grade[index_2nd]);
            }
            let length_2nd = subArr_2nd?.length;
            let BSPH201_grade = gradeArr_2nd[subArr_2nd?.indexOf("Physics-I (Gr-B)")] == undefined ? "" : gradeArr_2nd[subArr_2nd?.indexOf("Physics-I (Gr-B)")];
            let BSM202_grade = gradeArr_2nd[subArr_2nd?.indexOf("Mathematics-IIB")] == undefined ? "" : gradeArr_2nd[subArr_2nd?.indexOf("Mathematics-IIB")];
            let ESCS201_grade = gradeArr_2nd[subArr_2nd?.indexOf("Programming for Problem Solving")] == undefined ? "" : gradeArr_2nd[subArr_2nd?.indexOf("Programming for Problem Solving")];
            let HMHU201_grade = gradeArr_2nd[subArr_2nd?.indexOf("English")] == undefined ? "" : gradeArr_2nd[subArr_2nd?.indexOf("English")];
            let BSPH291_grade = gradeArr_2nd[subArr_2nd?.indexOf("Physics-I Laboratory (Gr-B)")] == undefined ? "" : gradeArr_2nd[subArr_2nd?.indexOf("Physics-I Laboratory (Gr-B)")];
            let ESCS291_grade = gradeArr_2nd[subArr_2nd?.indexOf("Programming for Problem Solving Laboratory")] == undefined ? "" : gradeArr_2nd[subArr_2nd?.indexOf("Programming for Problem Solving Laboratory")];
            let ESME292_grade = gradeArr_2nd[subArr_2nd?.indexOf("Workshop Manufacturing Practices (Gr-B)")] == undefined ? "" : gradeArr_2nd[subArr_2nd?.indexOf("Workshop Manufacturing Practices (Gr-B)")];
            let HMHU291_grade = gradeArr_2nd[subArr_2nd?.indexOf("Language Laboratory")] == undefined ? "" : gradeArr_2nd[subArr_2nd?.indexOf("Language Laboratory")];

            //* 2nd sem grade array
            let newGradeArr_2nd = [BSPH201_grade, BSM202_grade, ESCS201_grade, HMHU201_grade, BSPH291_grade, ESCS291_grade, ESME292_grade, HMHU291_grade];

            //*2nd sem points array            
            for (let i = 0; i < newGradeArr_2nd.length; i++) {
                let index = grade.indexOf(newGradeArr_2nd[i]);
                if (index == -1) {
                    pointsArr_2nd.push("");
                }
                else {
                    pointsArr_2nd.push(points[index]);
                }
            }

            //*2nd sem credit points array           

            for (let i = 0; i < newGradeArr_2nd.length; i++) {
                if (pointsArr_2nd[i] == "") {
                    creditPointsArr_2nd.push("")
                } else {
                    creditPointsArr_2nd.push(pointsArr_2nd[i] * creditArr_2nd[i]);
                }
            }

            //*************************************** */
            //*For 3rd sem
            const students_3rd = await StudentResult?.find({ sem: "3rd" });
            let rollArr_3rd = students_3rd[0]?.roll;
            let index_3rd = rollArr_3rd?.indexOf(userRoll.roll);
            let subArr_3rd = [];
            let gradeArr_3rd = [];
            let pointsArr_3rd = [];
            let creditPointsArr_3rd = [];
            for (let i = 0; i < students_3rd.length; i++) {
                subArr_3rd.push(students_3rd[i].sub[index_3rd]);
                gradeArr_3rd.push(students_3rd[i].grade[index_3rd]);
            }
            let length_3rd = subArr_3rd?.length;
            let PCEE301_grade = gradeArr_3rd[subArr_3rd?.indexOf("Electric Circuit Theory")] == undefined ? "" : gradeArr_3rd[subArr_3rd?.indexOf("Electric Circuit Theory")];
            let PCEE302_grade = gradeArr_3rd[subArr_3rd?.indexOf("Analog Electronics")] == undefined ? "" : gradeArr_3rd[subArr_3rd?.indexOf("Analog Electronics")];
            let PCEE303_grade = gradeArr_3rd[subArr_3rd?.indexOf("Elctromagnetic Field Theory")] == undefined ? "" : gradeArr_3rd[subArr_3rd?.indexOf("Elctromagnetic Field Theory")];
            let ESME301_grade = gradeArr_3rd[subArr_3rd?.indexOf("Engineering Mechanics")] == undefined ? "" : gradeArr_3rd[subArr_3rd?.indexOf("Engineering Mechanics")];
            let BSM301_grade = gradeArr_3rd[subArr_3rd?.indexOf("Mathematics-III")] == undefined ? "" : gradeArr_3rd[subArr_3rd?.indexOf("Mathematics-III")];
            let BSEE301_grade = gradeArr_3rd[subArr_3rd?.indexOf("Biology For Engineers")] == undefined ? "" : gradeArr_3rd[subArr_3rd?.indexOf("Biology For Engineers")];
            let MCEE301_grade = gradeArr_3rd[subArr_3rd?.indexOf("Indian Constitution")] == undefined ? "" : gradeArr_3rd[subArr_3rd?.indexOf("Indian Constitution")];
            let PCCS391_grade = gradeArr_3rd[subArr_3rd?.indexOf("Numerical Methods Laboratory")] == undefined ? "" : gradeArr_3rd[subArr_3rd?.indexOf("Numerical Methods Laboratory")];
            let PCEE391_grade = gradeArr_3rd[subArr_3rd?.indexOf("Circuit Theory Laboratory")] == undefined ? "" : gradeArr_3rd[subArr_3rd?.indexOf("Circuit Theory Laboratory")];
            let PCEE392_grade = gradeArr_3rd[subArr_3rd?.indexOf("Analog Electronics Laboratory")] == undefined ? "" : gradeArr_3rd[subArr_3rd?.indexOf("Analog Electronics Laboratory")];

            //*3rd sem grade array
            let newGradeArr_3rd = [PCEE301_grade, PCEE302_grade, PCEE303_grade, ESME301_grade, BSM301_grade, BSEE301_grade, MCEE301_grade, PCCS391_grade, PCEE391_grade, PCEE392_grade];

            //*3rd sem points array            
            for (let i = 0; i < newGradeArr_3rd.length; i++) {
                let index = grade.indexOf(newGradeArr_3rd[i]);
                if (index == -1) {
                    pointsArr_3rd.push("");
                }
                else {
                    pointsArr_3rd.push(points[index]);
                }
            }

            //*3rd sem credit points array           

            for (let i = 0; i < newGradeArr_3rd.length; i++) {
                if (pointsArr_3rd[i] == "") {
                    creditPointsArr_3rd.push("")
                } else {
                    creditPointsArr_3rd.push(pointsArr_3rd[i] * creditArr_3rd[i]);
                }
            }

            const param = {
                "content": "Result",
                "firstName": firstName,
                "lastName": lastName,
                "image": image,
                "subjectArray_1st": subjectArr_1st,
                "gradeArray_1st": newGradeArr_1st,
                "pointsArray_1st": pointsArr_1st,
                "creditArray_1st": creditArr_1st,
                "creditPointsArray_1st": creditPointsArr_1st,
                "length_1st": length_1st,
                "subCodeArray_1st": subCodeArr_1st,
                //********************** */
                "subjectArray_2nd": subjectArr_2nd,
                "gradeArray_2nd": newGradeArr_2nd,
                "pointsArray_2nd": pointsArr_2nd,
                "creditArray_2nd": creditArr_2nd,
                "creditPointsArray_2nd": creditPointsArr_2nd,
                "length_2nd": length_2nd,
                "subCodeArray_2nd": subCodeArr_2nd,
                //********************** */
                "subCodeArray_3rd": subCodeArr_3rd,
                "subjectArray_3rd": subjectArr_3rd,
                "gradeArray_3rd": newGradeArr_3rd,
                "pointsArray_3rd": pointsArr_3rd,
                "creditArray_3rd": creditArr_3rd,
                "creditPointsArray_3rd": creditPointsArr_3rd,
                "length_3rd": length_3rd,
                "subCodeArray_3rd": subCodeArr_3rd,
                "msg": "Teachers have not uploaded results"
            };
            res.status(200).render("result.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })


module.exports = Router;
