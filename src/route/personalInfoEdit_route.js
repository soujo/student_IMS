const express = require("express");
const Router = express.Router();
const rollNumber = require("../app");
const Register = require("../models/userRegistration");


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
            };
            res.status(200).render("personalInfoEdit.pug", param);

        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })
    


module.exports = Router;