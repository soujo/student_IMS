const express = require("express");
const Router = express.Router();
const Register = require("../models/userRegistration");
const PersonalInfo = require("../models/personalInfo");
const ClassMaterials = require("../models/teacher/studentClassMaterials");
let materials_1st, materials_2nd, materials_3rd;
const auth = require("../middleware/auth");
const jwt_decode = require("jwt-decode");

Router.route("/classMaterials")
    .get(auth, async (req, res) => {
        try {
            const token = req.cookies?.student;
            const roll = jwt_decode(token).roll;

            const userRoll = await Register.findOne({ roll });

            const firstName = userRoll?.firstName;
            const lastName = userRoll?.lastName;

            
            const studentRoll = await PersonalInfo.findOne({ roll });
            const image = studentRoll?.image;
            const sem = studentRoll?.sem;

            if (sem == "1st") {
                materials_1st = await ClassMaterials.find({ sem });
                materials_2nd = [];
                materials_3rd = [];
            }
            else if (sem == "2nd") {
                materials_2nd = await ClassMaterials.find({ sem });
                materials_1st = [];
                materials_3rd = [];
            }
            else {
                materials_3rd = await ClassMaterials.find({ sem });
                materials_1st = [];
                materials_2nd = [];
            }

            
            const link = `../static/uploads/classMaterials/`;
            const param = {
                "content": "Class Materials",
                "firstName": firstName,
                "lastName": lastName,
                "image": image,
                "materialArray_1st": materials_1st,
                "materialArray_2nd": materials_2nd,
                "materialArray_3rd": materials_3rd,
                "link": link,
                "msg": "No class materials from any teacher"
            };
            res.status(200).render("classMaterials.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })


module.exports = Router;
