const express = require("express");
const Router = express.Router();
const Register = require("../models/userRegistration");
const PersonalInfo = require("../models/personalInfo");
const studentAttendance = require("../models/teacher/studentAttendance");
const auth = require("../middleware/auth");
const jwt_decode = require("jwt-decode");
let roll;

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


Router.route("/attendance")
    .get(auth, async (req, res) => {
        try {
            const token = req.cookies?.student;
            roll = jwt_decode(token).roll;

            const userRoll = await Register.findOne({ roll });

            const firstName = userRoll?.firstName;
            const lastName = userRoll?.lastName;

            const personalInfoRoll = await PersonalInfo.findOne({ roll });
            const image = personalInfoRoll?.image;

            //**************************************************** */

            //*For 1st sem

            const students_1st = await studentAttendance?.find({ sem: "1st" });
            let rollArr_1st = students_1st[0]?.roll;
            let index_1st = rollArr_1st?.indexOf(userRoll?.roll);
            let subArr_1st = [];
            let totalClassArr_1st = [];
            let classAttended_1st = [];
            let percentageArr_1st = [];
            let newPercentageArr_1st = [];

            for (let i = 0; i < students_1st.length; i++) {
                subArr_1st.push(students_1st[i].sub[index_1st]);
                totalClassArr_1st.push(students_1st[i].totalClass[index_1st]);
                classAttended_1st.push(students_1st[i].classAttended[index_1st]);
            }

            let length_1st = subArr_1st?.length;

            let SUB101_TC = totalClassArr_1st[subArr_1st?.indexOf("Subject-101")] == undefined ? "" : totalClassArr_1st[subArr_1st?.indexOf("Subject-101")];
            let SUB102_TC = totalClassArr_1st[subArr_1st?.indexOf("Subject-102")] == undefined ? "" : totalClassArr_1st[subArr_1st?.indexOf("Subject-102")];
            let SUB103_TC = totalClassArr_1st[subArr_1st?.indexOf("Subject-103")] == undefined ? "" : totalClassArr_1st[subArr_1st?.indexOf("Subject-103")];
            let SUB104_TC = totalClassArr_1st[subArr_1st?.indexOf("Subject-104")] == undefined ? "" : totalClassArr_1st[subArr_1st?.indexOf("Subject-104")];
            let SUB105_TC = totalClassArr_1st[subArr_1st?.indexOf("Subject-105")] == undefined ? "" : totalClassArr_1st[subArr_1st?.indexOf("Subject-105")];
            let SUB106_TC = totalClassArr_1st[subArr_1st?.indexOf("Subject-106")] == undefined ? "" : totalClassArr_1st[subArr_1st?.indexOf("Subject-106")];

            //* Total class array
            let newTCArr_1st = [SUB101_TC, SUB102_TC, SUB103_TC, SUB104_TC, SUB105_TC, SUB106_TC];

            let SUB101_CA  = classAttended_1st[subArr_1st?.indexOf("Subject-101")] == undefined ? "" : classAttended_1st[subArr_1st?.indexOf("Subject-101")];
            let SUB102_CA  = classAttended_1st[subArr_1st?.indexOf("Subject-102")] == undefined ? "" : classAttended_1st[subArr_1st?.indexOf("Subject-102")];
            let SUB103_CA  = classAttended_1st[subArr_1st?.indexOf("Subject-103")] == undefined ? "" : classAttended_1st[subArr_1st?.indexOf("Subject-103")];
            let SUB104_CA  = classAttended_1st[subArr_1st?.indexOf("Subject-104")] == undefined ? "" : classAttended_1st[subArr_1st?.indexOf("Subject-104")];
            let SUB105_CA  = classAttended_1st[subArr_1st?.indexOf("Subject-105")] == undefined ? "" : classAttended_1st[subArr_1st?.indexOf("Subject-105")];
            let SUB106_CA  = classAttended_1st[subArr_1st?.indexOf("Subject-106")] == undefined ? "" : classAttended_1st[subArr_1st?.indexOf("Subject-106")];

            //* Class Attended array
            let newCAArr_1st = [SUB101_CA, 
                SUB102_CA, 
                SUB103_CA, 
                SUB104_CA, 
                SUB105_CA, 
                SUB106_CA
            ];

            //* Percentage array
            for (let i = 0; i < newCAArr_1st.length; i++) {
                percentageArr_1st[i] = (newCAArr_1st[i] / newTCArr_1st[i]) * 100;
            }

            for (let i = 0; i < percentageArr_1st.length; i++) {
                if (percentageArr_1st[i]) {
                    newPercentageArr_1st[i] = percentageArr_1st[i];
                }
                else {
                    newPercentageArr_1st[i] == " ";
                }
            }

            //*************************************** */

            //*For 2nd sem

            const students_2nd = await studentAttendance?.find({ sem: "2nd" });
            let rollArr_2nd = students_2nd[0]?.roll;
            let index_2nd = rollArr_2nd?.indexOf(userRoll?.roll);
            let subArr_2nd = [];
            let totalClassArr_2nd = [];
            let classAttended_2nd = [];
            let percentageArr_2nd = [];
            let newPercentageArr_2nd = [];

            for (let i = 0; i < students_2nd.length; i++) {
                subArr_2nd.push(students_2nd[i].sub[index_2nd]);
                totalClassArr_2nd.push(students_2nd[i].totalClass[index_2nd]);
                classAttended_2nd.push(students_2nd[i].classAttended[index_2nd]);
            }

            let length_2nd = subArr_2nd?.length;

            let SUB201_TC = totalClassArr_2nd[subArr_2nd?.indexOf("Subject-201")] == undefined ? "" : totalClassArr_2nd[subArr_2nd?.indexOf("Subject-201")];
            let SUB202_TC = totalClassArr_2nd[subArr_2nd?.indexOf("Subject-202")] == undefined ? "" : totalClassArr_2nd[subArr_2nd?.indexOf("Subject-202")];
            let SUB203_TC = totalClassArr_2nd[subArr_2nd?.indexOf("Subject-203")] == undefined ? "" : totalClassArr_2nd[subArr_2nd?.indexOf("Subject-203")];
            let SUB204_TC = totalClassArr_2nd[subArr_2nd?.indexOf("Subject-204")] == undefined ? "" : totalClassArr_2nd[subArr_2nd?.indexOf("Subject-204")];
            let SUB205_TC = totalClassArr_2nd[subArr_2nd?.indexOf("Subject-205")] == undefined ? "" : totalClassArr_2nd[subArr_2nd?.indexOf("Subject-205")];
            let SUB206_TC = totalClassArr_2nd[subArr_2nd?.indexOf("Subject-206")] == undefined ? "" : totalClassArr_2nd[subArr_2nd?.indexOf("Subject-206")];
            let SUB207_TC = totalClassArr_2nd[subArr_2nd?.indexOf("Subject-207")] == undefined ? "" : totalClassArr_2nd[subArr_2nd?.indexOf("Subject-207")];
            let SUB208_TC = totalClassArr_2nd[subArr_2nd?.indexOf("Subject-208")] == undefined ? "" : totalClassArr_2nd[subArr_2nd?.indexOf("Subject-208")];
            
            //* Total class array
            let newTCArr_2nd = [SUB201_TC, SUB202_TC, SUB203_TC, SUB204_TC, SUB205_TC, SUB206_TC, SUB207_TC, SUB208_TC];
            
            let SUB201_CA = classAttended_2nd[subArr_2nd?.indexOf("Subject-201")] == undefined ? "" : classAttended_2nd[subArr_2nd?.indexOf("Subject-201")];
            let SUB202_CA = classAttended_2nd[subArr_2nd?.indexOf("Subject-202")] == undefined ? "" : classAttended_2nd[subArr_2nd?.indexOf("Subject-202")];
            let SUB203_CA = classAttended_2nd[subArr_2nd?.indexOf("Subject-203")] == undefined ? "" : classAttended_2nd[subArr_2nd?.indexOf("Subject-203")];
            let SUB204_CA = classAttended_2nd[subArr_2nd?.indexOf("Subject-204")] == undefined ? "" : classAttended_2nd[subArr_2nd?.indexOf("Subject-204")];
            let SUB205_CA = classAttended_2nd[subArr_2nd?.indexOf("Subject-205")] == undefined ? "" : classAttended_2nd[subArr_2nd?.indexOf("Subject-205")];
            let SUB206_CA = classAttended_2nd[subArr_2nd?.indexOf("Subject-206")] == undefined ? "" : classAttended_2nd[subArr_2nd?.indexOf("Subject-206")];
            let SUB207_CA = classAttended_2nd[subArr_2nd?.indexOf("Subject-207")] == undefined ? "" : classAttended_2nd[subArr_2nd?.indexOf("Subject-207")];
            let SUB208_CA = classAttended_2nd[subArr_2nd?.indexOf("Subject-208")] == undefined ? "" : classAttended_2nd[subArr_2nd?.indexOf("Subject-208")];
            
            //* Class Attended array
            let newCAArr_2nd = [
                SUB201_CA, 
                SUB202_CA, 
                SUB203_CA, 
                SUB204_CA, 
                SUB205_CA, 
                SUB206_CA, 
                SUB207_CA, 
                SUB208_CA, 
            ];

            //* Percentage array
            for (let i = 0; i < newCAArr_2nd.length; i++) {
                percentageArr_2nd[i] = (newCAArr_2nd[i] / newTCArr_2nd[i]) * 100;
            }

            for (let i = 0; i < percentageArr_2nd.length; i++) {
                if (percentageArr_2nd[i]) {
                    newPercentageArr_2nd[i] = percentageArr_2nd[i];
                }
                else {
                    newPercentageArr_2nd[i] == " ";
                }
            }

            //*************************************** */

            //*For 3rd sem

            const students_3rd = await studentAttendance?.find({ sem: "3rd" });
            let rollArr_3rd = students_3rd[0]?.roll;
            let index_3rd = rollArr_3rd?.indexOf(userRoll?.roll);
            let subArr_3rd = [];
            let totalClassArr_3rd = [];
            let classAttended_3rd = [];
            let percentageArr_3rd = [];
            let newPercentageArr_3rd = [];

            for (let i = 0; i < students_3rd.length; i++) {
                subArr_3rd.push(students_3rd[i].sub[index_3rd]);
                totalClassArr_3rd.push(students_3rd[i].totalClass[index_3rd]);
                classAttended_3rd.push(students_3rd[i].classAttended[index_3rd]);
            }

            let length_3rd = subArr_3rd?.length;

            let SUB301_TC = totalClassArr_3rd[subArr_3rd?.indexOf("Subject-301")] == undefined ? "" : totalClassArr_3rd[subArr_3rd?.indexOf("Subject-301")];
            let SUB302_TC = totalClassArr_3rd[subArr_3rd?.indexOf("Subject-302")] == undefined ? "" : totalClassArr_3rd[subArr_3rd?.indexOf("Subject-302")];
            let SUB303_TC = totalClassArr_3rd[subArr_3rd?.indexOf("Subject-303")] == undefined ? "" : totalClassArr_3rd[subArr_3rd?.indexOf("Subject-303")];
            let SUB304_TC = totalClassArr_3rd[subArr_3rd?.indexOf("Subject-304")] == undefined ? "" : totalClassArr_3rd[subArr_3rd?.indexOf("Subject-304")];
            let SUB305_TC = totalClassArr_3rd[subArr_3rd?.indexOf("Subject-305")] == undefined ? "" : totalClassArr_3rd[subArr_3rd?.indexOf("Subject-305")];
            let SUB306_TC = totalClassArr_3rd[subArr_3rd?.indexOf("Subject-306")] == undefined ? "" : totalClassArr_3rd[subArr_3rd?.indexOf("Subject-306")];
            let SUB307_TC = totalClassArr_3rd[subArr_3rd?.indexOf("Subject-307")] == undefined ? "" : totalClassArr_3rd[subArr_3rd?.indexOf("Subject-307")];
            let SUB308_TC = totalClassArr_3rd[subArr_3rd?.indexOf("Subject-308")] == undefined ? "" : totalClassArr_3rd[subArr_3rd?.indexOf("Subject-308")];
            let SUB309_TC = totalClassArr_3rd[subArr_3rd?.indexOf("Subject-309")] == undefined ? "" : totalClassArr_3rd[subArr_3rd?.indexOf("Subject-309")];
            let SUB310_TC = totalClassArr_3rd[subArr_3rd?.indexOf("Subject-310")] == undefined ? "" : totalClassArr_3rd[subArr_3rd?.indexOf("Subject-310")];
            
            //* Total class array
            let newTCArr_3rd = [
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

            let SUB301_CA = classAttended_3rd[subArr_3rd?.indexOf("Subject-301")] == undefined ? "" : classAttended_3rd[subArr_3rd?.indexOf("Subject-301")];
            let SUB302_CA = classAttended_3rd[subArr_3rd?.indexOf("Subject-302")] == undefined ? "" : classAttended_3rd[subArr_3rd?.indexOf("Subject-302")];
            let SUB303_CA = classAttended_3rd[subArr_3rd?.indexOf("Subject-303")] == undefined ? "" : classAttended_3rd[subArr_3rd?.indexOf("Subject-303")];
            let SUB304_CA = classAttended_3rd[subArr_3rd?.indexOf("Subject-304")] == undefined ? "" : classAttended_3rd[subArr_3rd?.indexOf("Subject-304")];
            let SUB305_CA = classAttended_3rd[subArr_3rd?.indexOf("Subject-305")] == undefined ? "" : classAttended_3rd[subArr_3rd?.indexOf("Subject-305")];
            let SUB306_CA = classAttended_3rd[subArr_3rd?.indexOf("Subject-306")] == undefined ? "" : classAttended_3rd[subArr_3rd?.indexOf("Subject-306")];
            let SUB307_CA = classAttended_3rd[subArr_3rd?.indexOf("Subject-307")] == undefined ? "" : classAttended_3rd[subArr_3rd?.indexOf("Subject-307")];
            let SUB308_CA = classAttended_3rd[subArr_3rd?.indexOf("Subject-308")] == undefined ? "" : classAttended_3rd[subArr_3rd?.indexOf("Subject-308")];
            let SUB309_CA = classAttended_3rd[subArr_3rd?.indexOf("Subject-309")] == undefined ? "" : classAttended_3rd[subArr_3rd?.indexOf("Subject-309")];
            let SUB310_CA = classAttended_3rd[subArr_3rd?.indexOf("Subject-310")] == undefined ? "" : classAttended_3rd[subArr_3rd?.indexOf("Subject-310")];
            
            //* Class Attended array
            let newCAArr_3rd =[
                SUB301_CA,
                SUB302_CA,
                SUB303_CA,
                SUB304_CA,
                SUB305_CA,
                SUB306_CA,
                SUB307_CA,
                SUB308_CA,
                SUB309_CA,
                SUB310_CA,
            ];

            //* Percentage array
            for (let i = 0; i < newCAArr_3rd.length; i++) {
                percentageArr_3rd[i] = (newCAArr_3rd[i] / newTCArr_3rd[i]) * 100;
            }

            for (let i = 0; i < percentageArr_3rd.length; i++) {
                if (percentageArr_3rd[i]) {
                    newPercentageArr_3rd[i] = percentageArr_3rd[i];
                }
                else {
                    newPercentageArr_3rd[i] == " ";
                }
            }

            //*************************************** */

            const param = {
                "content": "Attendance",
                "firstName": firstName,
                "lastName": lastName,
                "image": image,
                "subjectArray_1st": subjectArr_1st,
                "subCodeArray_1st": subCodeArr_1st,
                "length_1st": length_1st,
                "totalClassArray_1st": newTCArr_1st,
                "classAttendedArray_1st": newCAArr_1st,
                "percentageArray_1st": newPercentageArr_1st,
                //******************************** */
                "subjectArray_2nd": subjectArr_2nd,
                "subCodeArray_2nd": subCodeArr_2nd,
                "length_2nd": length_2nd,
                "totalClassArray_2nd": newTCArr_2nd,
                "classAttendedArray_2nd": newCAArr_2nd,
                "percentageArray_2nd": newPercentageArr_2nd,
                //******************************** */
                "subjectArray_3rd": subjectArr_3rd,
                "subCodeArray_3rd": subCodeArr_3rd,
                "length_3rd": length_3rd,
                "totalClassArray_3rd": newTCArr_3rd,
                "classAttendedArray_3rd": newCAArr_3rd,
                "percentageArray_3rd": newPercentageArr_3rd,
                "msg": "Teachers have not uploaded attendance"

            };
            res.status(200).render("attendance.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })


module.exports = Router;