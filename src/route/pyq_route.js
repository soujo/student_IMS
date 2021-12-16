const express = require("express");
const Router = express.Router();
const rollNumber = require("../app");
const Register = require("../models/userRegistration");

Router.route("/pyq")
    .get(async (req, res) => {

        try {
            const userRoll = await Register.findOne({ roll:rollNumber.roll});

            const firstName = userRoll?.firstName;
            const lastName = userRoll?.lastName;
            const image = `../static/uploads/${rollNumber.roll}.jpeg`;
            const param = {
                "content":"Previous Year Questions",
                "firstName": firstName,
                "lastName": lastName,
                "image":image
            };
            res.status(200).render("pyq.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })






module.exports = Router;