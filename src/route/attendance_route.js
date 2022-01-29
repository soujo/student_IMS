const express = require("express");
const Router = express.Router();
const Register = require("../models/userRegistration");
const PersonalInfo = require("../models/personalInfo");
const studentAttendance = require("../models/teacher/studentAttendance");
const auth = require("../middleware/auth");
const jwt_decode = require("jwt-decode");
let roll;

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

            let BSCH101_TC = totalClassArr_1st[subArr_1st?.indexOf("Chemistry-I (Gr-B)")] == undefined ? "" : totalClassArr_1st[subArr_1st?.indexOf("Chemistry-I (Gr-B)")];
            let BSM102_TC = totalClassArr_1st[subArr_1st?.indexOf("Mathematics-IB")] == undefined ? "" : totalClassArr_1st[subArr_1st?.indexOf("Mathematics-IB")];
            let ESEE101_TC = totalClassArr_1st[subArr_1st?.indexOf("Basic Electrical Engineering")] == undefined ? "" : totalClassArr_1st[subArr_1st?.indexOf("Basic Electrical Engineering")];
            let BSCH191_TC = totalClassArr_1st[subArr_1st?.indexOf("Chemistry-I Laboratory (Gr-B)")] == undefined ? "" : totalClassArr_1st[subArr_1st?.indexOf("Chemistry-I Laboratory (Gr-B)")];
            let ESEE191_TC = totalClassArr_1st[subArr_1st?.indexOf("Basic Electrical Engineering Laboratory")] == undefined ? "" : totalClassArr_1st[subArr_1st?.indexOf("Basic Electrical Engineering Laboratory")];
            let ESME191_TC = totalClassArr_1st[subArr_1st?.indexOf("Engineering Graphics & Design (Gr-B)")] == undefined ? "" : totalClassArr_1st[subArr_1st?.indexOf("Engineering Graphics & Design (Gr-B)")];

            //* Total class array
            let newTCArr_1st = [BSCH101_TC, BSM102_TC, ESEE101_TC, BSCH191_TC, ESEE191_TC, ESME191_TC];

            let BSCH101_CA = classAttended_1st[subArr_1st?.indexOf("Chemistry-I (Gr-B)")] == undefined ? "" : classAttended_1st[subArr_1st?.indexOf("Chemistry-I (Gr-B)")];
            let BSM102_CA = classAttended_1st[subArr_1st?.indexOf("Mathematics-IB")] == undefined ? "" : classAttended_1st[subArr_1st?.indexOf("Mathematics-IB")];
            let ESEE101_CA = classAttended_1st[subArr_1st?.indexOf("Basic Electrical Engineering")] == undefined ? "" : classAttended_1st[subArr_1st?.indexOf("Basic Electrical Engineering")];
            let BSCH191_CA = classAttended_1st[subArr_1st?.indexOf("Chemistry-I Laboratory (Gr-B)")] == undefined ? "" : classAttended_1st[subArr_1st?.indexOf("Chemistry-I Laboratory (Gr-B)")];
            let ESEE191_CA = classAttended_1st[subArr_1st?.indexOf("Basic Electrical Engineering Laboratory")] == undefined ? "" : classAttended_1st[subArr_1st?.indexOf("Basic Electrical Engineering Laboratory")];
            let ESME191_CA = classAttended_1st[subArr_1st?.indexOf("Engineering Graphics & Design (Gr-B)")] == undefined ? "" : classAttended_1st[subArr_1st?.indexOf("Engineering Graphics & Design (Gr-B)")];

            //* Class Attended array
            let newCAArr_1st = [BSCH101_CA, BSM102_CA, ESEE101_CA, BSCH191_CA, ESEE191_CA, ESME191_CA];

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

            let BSPH201_TC = totalClassArr_2nd[subArr_2nd?.indexOf("Physics-I (Gr-B)")] == undefined ? "" : totalClassArr_2nd[subArr_2nd?.indexOf("Physics-I (Gr-B)")];
            let BSM202_TC = totalClassArr_2nd[subArr_2nd?.indexOf("Mathematics-IIB")] == undefined ? "" : totalClassArr_2nd[subArr_2nd?.indexOf("Mathematics-IIB")];
            let ESCS201_TC = totalClassArr_2nd[subArr_2nd?.indexOf("Programming for Problem Solving")] == undefined ? "" : totalClassArr_2nd[subArr_2nd?.indexOf("Programming for Problem Solving")];
            let HMHU201_TC = totalClassArr_2nd[subArr_2nd?.indexOf("English")] == undefined ? "" : totalClassArr_2nd[subArr_2nd?.indexOf("English")];
            let BSPH291_TC = totalClassArr_2nd[subArr_2nd?.indexOf("Physics-I Laboratory (Gr-B)")] == undefined ? "" : totalClassArr_2nd[subArr_2nd?.indexOf("Physics-I Laboratory (Gr-B)")];
            let ESCS291_TC = totalClassArr_2nd[subArr_2nd?.indexOf("Programming for Problem Solving Laboratory")] == undefined ? "" : totalClassArr_2nd[subArr_2nd?.indexOf("Programming for Problem Solving Laboratory")];
            let ESME292_TC = totalClassArr_2nd[subArr_2nd?.indexOf("Workshop Manufacturing Practices (Gr-B)")] == undefined ? "" : totalClassArr_2nd[subArr_2nd?.indexOf("Workshop Manufacturing Practices (Gr-B)")];
            let HMHU291_TC = totalClassArr_2nd[subArr_2nd?.indexOf("Language Laboratory")] == undefined ? "" : totalClassArr_2nd[subArr_2nd?.indexOf("Language Laboratory")];

            //* Total class array
            let newTCArr_2nd = [BSPH201_TC, BSM202_TC, ESCS201_TC, HMHU201_TC, BSPH291_TC, ESCS291_TC, ESME292_TC, HMHU291_TC];

            let BSPH201_CA = classAttended_2nd[subArr_2nd?.indexOf("Physics-I (Gr-B)")] == undefined ? "" : classAttended_2nd[subArr_2nd?.indexOf("Physics-I (Gr-B)")];
            let BSM202_CA = classAttended_2nd[subArr_2nd?.indexOf("Mathematics-IIB")] == undefined ? "" : classAttended_2nd[subArr_2nd?.indexOf("Mathematics-IIB")];
            let ESCS201_CA = classAttended_2nd[subArr_2nd?.indexOf("Programming for Problem Solving")] == undefined ? "" : classAttended_2nd[subArr_2nd?.indexOf("Programming for Problem Solving")];
            let HMHU201_CA = classAttended_2nd[subArr_2nd?.indexOf("English")] == undefined ? "" : classAttended_2nd[subArr_2nd?.indexOf("English")];
            let BSPH291_CA = classAttended_2nd[subArr_2nd?.indexOf("Physics-I Laboratory (Gr-B)")] == undefined ? "" : classAttended_2nd[subArr_2nd?.indexOf("Physics-I Laboratory (Gr-B)")];
            let ESCS291_CA = classAttended_2nd[subArr_2nd?.indexOf("Programming for Problem Solving Laboratory")] == undefined ? "" : classAttended_2nd[subArr_2nd?.indexOf("Programming for Problem Solving Laboratory")];
            let ESME292_CA = classAttended_2nd[subArr_2nd?.indexOf("Workshop Manufacturing Practices (Gr-B)")] == undefined ? "" : classAttended_2nd[subArr_2nd?.indexOf("Workshop Manufacturing Practices (Gr-B)")];
            let HMHU291_CA = classAttended_2nd[subArr_2nd?.indexOf("Language Laboratory")] == undefined ? "" : classAttended_2nd[subArr_2nd?.indexOf("Language Laboratory")];

            //* Class Attended array
            let newCAArr_2nd = [BSPH201_CA, BSM202_CA, ESCS201_CA, HMHU201_CA, BSPH291_CA, ESCS291_CA, ESME292_CA, HMHU291_CA];

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

            let PCEE301_TC = totalClassArr_3rd[subArr_3rd?.indexOf("Electric Circuit Theory")] == undefined ? "" : totalClassArr_3rd[subArr_3rd?.indexOf("Electric Circuit Theory")];
            let PCEE302_TC = totalClassArr_3rd[subArr_3rd?.indexOf("Analog Electronics")] == undefined ? "" : totalClassArr_3rd[subArr_3rd?.indexOf("Analog Electronics")];
            let PCEE303_TC = totalClassArr_3rd[subArr_3rd?.indexOf("Elctromagnetic Field Theory")] == undefined ? "" : totalClassArr_3rd[subArr_3rd?.indexOf("Elctromagnetic Field Theory")];
            let ESME301_TC = totalClassArr_3rd[subArr_3rd?.indexOf("Engineering Mechanics")] == undefined ? "" : totalClassArr_3rd[subArr_3rd?.indexOf("Engineering Mechanics")];
            let BSM301_TC = totalClassArr_3rd[subArr_3rd?.indexOf("Mathematics-III")] == undefined ? "" : totalClassArr_3rd[subArr_3rd?.indexOf("Mathematics-III")];
            let BSEE301_TC = totalClassArr_3rd[subArr_3rd?.indexOf("Biology For Engineers")] == undefined ? "" : totalClassArr_3rd[subArr_3rd?.indexOf("Biology For Engineers")];
            let MCEE301_TC = totalClassArr_3rd[subArr_3rd?.indexOf("Indian Constitution")] == undefined ? "" : totalClassArr_3rd[subArr_3rd?.indexOf("Indian Constitution")];
            let PCCS391_TC = totalClassArr_3rd[subArr_3rd?.indexOf("Numerical Methods Laboratory")] == undefined ? "" : totalClassArr_3rd[subArr_3rd?.indexOf("Numerical Methods Laboratory")];
            let PCEE391_TC = totalClassArr_3rd[subArr_3rd?.indexOf("Circuit Theory Laboratory")] == undefined ? "" : totalClassArr_3rd[subArr_3rd?.indexOf("Circuit Theory Laboratory")];
            let PCEE392_TC = totalClassArr_3rd[subArr_3rd?.indexOf("Analog Electronics Laboratory")] == undefined ? "" : totalClassArr_3rd[subArr_3rd?.indexOf("Analog Electronics Laboratory")];

            //* Total class array
            let newTCArr_3rd = [PCEE301_TC, PCEE302_TC, PCEE303_TC, ESME301_TC, BSM301_TC, BSEE301_TC, MCEE301_TC, PCCS391_TC, PCEE391_TC, PCEE392_TC];

            let PCEE301_CA = classAttended_3rd[subArr_3rd?.indexOf("Electric Circuit Theory")] == undefined ? "" : classAttended_3rd[subArr_3rd?.indexOf("Electric Circuit Theory")];
            let PCEE302_CA = classAttended_3rd[subArr_3rd?.indexOf("Analog Electronics")] == undefined ? "" : classAttended_3rd[subArr_3rd?.indexOf("Analog Electronics")];
            let PCEE303_CA = classAttended_3rd[subArr_3rd?.indexOf("Elctromagnetic Field Theory")] == undefined ? "" : classAttended_3rd[subArr_3rd?.indexOf("Elctromagnetic Field Theory")];
            let ESME301_CA = classAttended_3rd[subArr_3rd?.indexOf("Engineering Mechanics")] == undefined ? "" : classAttended_3rd[subArr_3rd?.indexOf("Engineering Mechanics")];
            let BSM301_CA = classAttended_3rd[subArr_3rd?.indexOf("Mathematics-III")] == undefined ? "" : classAttended_3rd[subArr_3rd?.indexOf("Mathematics-III")];
            let BSEE301_CA = classAttended_3rd[subArr_3rd?.indexOf("Biology For Engineers")] == undefined ? "" : classAttended_3rd[subArr_3rd?.indexOf("Biology For Engineers")];
            let MCEE301_CA = classAttended_3rd[subArr_3rd?.indexOf("Indian Constitution")] == undefined ? "" : classAttended_3rd[subArr_3rd?.indexOf("Indian Constitution")];
            let PCCS391_CA = classAttended_3rd[subArr_3rd?.indexOf("Numerical Methods Laboratory")] == undefined ? "" : classAttended_3rd[subArr_3rd?.indexOf("Numerical Methods Laboratory")];
            let PCEE391_CA = classAttended_3rd[subArr_3rd?.indexOf("Circuit Theory Laboratory")] == undefined ? "" : classAttended_3rd[subArr_3rd?.indexOf("Circuit Theory Laboratory")];
            let PCEE392_CA = classAttended_3rd[subArr_3rd?.indexOf("Analog Electronics Laboratory")] == undefined ? "" : classAttended_3rd[subArr_3rd?.indexOf("Analog Electronics Laboratory")];

            //* Class Attended array
            let newCAArr_3rd = [PCEE301_CA, PCEE302_CA, PCEE303_CA, ESME301_CA, BSM301_CA, BSEE301_CA, MCEE301_CA, PCCS391_CA, PCEE391_CA, PCEE392_CA];

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