const express = require("express");
const Router = express.Router();
const Register = require("../models/userRegistration");
const PersonalInfo = require("../models/personalInfo");
const StudentResult = require("../models/teacher/studentResult");
const jwt_decode = require("jwt-decode");
const auth = require("../middleware/auth");
const grade = ["O", "E", "A", "B", "C", "D", "F", "I"];
const points = [10, 9, 8, 7, 6, 5, 2, 2];

const subCodeArr_1st = [
    "SUB101",
    "SUB102",
    "SUB103",
    "SUB104",
    "SUB105",
    "SUB106"
]
const subjectArr_1st = [
    "Subject-101",
    "Subject-102",
    "Subject-103",
    "Subject-104",
    "Subject-105",
    "Subject-106",
]

//****************** */
const subCodeArr_2nd = [
    "SUB201",
    "SUB202",
    "SUB203",
    "SUB204",
    "SUB205",
    "SUB206",
    "SUB207",
    "SUB208",
]
const subjectArr_2nd = [
    "Subject-201",
    "Subject-202",
    "Subject-203",
    "Subject-204",
    "Subject-205",
    "Subject-206",
    "Subject-207",
    "Subject-208",
]

//****************** */
const subCodeArr_3rd = [
    "SUB301",
    "SUB302",
    "SUB303",
    "SUB304",
    "SUB305",
    "SUB306",
    "SUB307",
    "SUB308",
    "SUB309",
    "SUB310",
]
const subjectArr_3rd = [
    "Subject-301",
    "Subject-302",
    "Subject-303",
    "Subject-304",
    "Subject-305",
    "Subject-306",
    "Subject-307",
    "Subject-308",
    "Subject-309",
    "Subject-310",
]

const creditArr_1st = [4, 4, 4, 1.5, 1, 3];
const creditArr_2nd = [4, 4, 3, 2, 1.5, 2, 3, 1];
const creditArr_3rd = [4, 3, 3, 3, 3, 3, 0, 1, 1, 1];

Router.route("/result")
    .get(auth, async (req, res) => {
        try {
            const token = req.cookies?.student;
            const roll = jwt_decode(token).roll;

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

            let SUB101_grade = gradeArr_1st[subArr_1st?.indexOf("Subject-101")] == undefined ? "" : gradeArr_1st[subArr_1st?.indexOf("Subject-101")];
            let SUB102_grade = gradeArr_1st[subArr_1st?.indexOf("Subject-102")] == undefined ? "" : gradeArr_1st[subArr_1st?.indexOf("Subject-102")];
            let SUB103_grade = gradeArr_1st[subArr_1st?.indexOf("Subject-103")] == undefined ? "" : gradeArr_1st[subArr_1st?.indexOf("Subject-103")];
            let SUB104_grade = gradeArr_1st[subArr_1st?.indexOf("Subject-104")] == undefined ? "" : gradeArr_1st[subArr_1st?.indexOf("Subject-104")];
            let SUB105_grade = gradeArr_1st[subArr_1st?.indexOf("Subject-105")] == undefined ? "" : gradeArr_1st[subArr_1st?.indexOf("Subject-105")];
            let SUB106_grade = gradeArr_1st[subArr_1st?.indexOf("Subject-106")] == undefined ? "" : gradeArr_1st[subArr_1st?.indexOf("Subject-106")];

            //* 1st sem grade array
            let newGradeArr_1st = [
                SUB101_grade,
                SUB102_grade,
                SUB103_grade,
                SUB104_grade,
                SUB105_grade,
                SUB106_grade
            ];

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
            let SUB201_TC = gradeArr_2nd[subArr_2nd?.indexOf("Subject-201")] == undefined ? "" : gradeArr_2nd[subArr_2nd?.indexOf("Subject-201")];
            let SUB202_TC = gradeArr_2nd[subArr_2nd?.indexOf("Subject-202")] == undefined ? "" : gradeArr_2nd[subArr_2nd?.indexOf("Subject-202")];
            let SUB203_TC = gradeArr_2nd[subArr_2nd?.indexOf("Subject-203")] == undefined ? "" : gradeArr_2nd[subArr_2nd?.indexOf("Subject-203")];
            let SUB204_TC = gradeArr_2nd[subArr_2nd?.indexOf("Subject-204")] == undefined ? "" : gradeArr_2nd[subArr_2nd?.indexOf("Subject-204")];
            let SUB205_TC = gradeArr_2nd[subArr_2nd?.indexOf("Subject-205")] == undefined ? "" : gradeArr_2nd[subArr_2nd?.indexOf("Subject-205")];
            let SUB206_TC = gradeArr_2nd[subArr_2nd?.indexOf("Subject-206")] == undefined ? "" : gradeArr_2nd[subArr_2nd?.indexOf("Subject-206")];
            let SUB207_TC = gradeArr_2nd[subArr_2nd?.indexOf("Subject-207")] == undefined ? "" : gradeArr_2nd[subArr_2nd?.indexOf("Subject-207")];
            let SUB208_TC = gradeArr_2nd[subArr_2nd?.indexOf("Subject-208")] == undefined ? "" : gradeArr_2nd[subArr_2nd?.indexOf("Subject-208")];

            //* 2nd sem grade array
            let newGradeArr_2nd = [
                SUB201_TC,
                SUB202_TC,
                SUB203_TC,
                SUB204_TC,
                SUB205_TC,
                SUB206_TC,
                SUB207_TC,
                SUB208_TC
            ];

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
            let SUB301_TC = gradeArr_3rd[subArr_3rd?.indexOf("Subject-301")] == undefined ? "" : gradeArr_3rd[subArr_3rd?.indexOf("Subject-301")];
            let SUB302_TC = gradeArr_3rd[subArr_3rd?.indexOf("Subject-302")] == undefined ? "" : gradeArr_3rd[subArr_3rd?.indexOf("Subject-302")];
            let SUB303_TC = gradeArr_3rd[subArr_3rd?.indexOf("Subject-303")] == undefined ? "" : gradeArr_3rd[subArr_3rd?.indexOf("Subject-303")];
            let SUB304_TC = gradeArr_3rd[subArr_3rd?.indexOf("Subject-304")] == undefined ? "" : gradeArr_3rd[subArr_3rd?.indexOf("Subject-304")];
            let SUB305_TC = gradeArr_3rd[subArr_3rd?.indexOf("Subject-305")] == undefined ? "" : gradeArr_3rd[subArr_3rd?.indexOf("Subject-305")];
            let SUB306_TC = gradeArr_3rd[subArr_3rd?.indexOf("Subject-306")] == undefined ? "" : gradeArr_3rd[subArr_3rd?.indexOf("Subject-306")];
            let SUB307_TC = gradeArr_3rd[subArr_3rd?.indexOf("Subject-307")] == undefined ? "" : gradeArr_3rd[subArr_3rd?.indexOf("Subject-307")];
            let SUB308_TC = gradeArr_3rd[subArr_3rd?.indexOf("Subject-308")] == undefined ? "" : gradeArr_3rd[subArr_3rd?.indexOf("Subject-308")];
            let SUB309_TC = gradeArr_3rd[subArr_3rd?.indexOf("Subject-309")] == undefined ? "" : gradeArr_3rd[subArr_3rd?.indexOf("Subject-309")];
            let SUB310_TC = gradeArr_3rd[subArr_3rd?.indexOf("Subject-310")] == undefined ? "" : gradeArr_3rd[subArr_3rd?.indexOf("Subject-310")];
            
            //*3rd sem grade array
            let newGradeArr_3rd = [
                SUB301_TC,
                SUB302_TC,
                SUB303_TC,
                SUB304_TC,
                SUB305_TC,
                SUB306_TC,
                SUB307_TC,
                SUB308_TC,
                SUB309_TC,
                SUB310_TC
            ];

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
