const express = require("express");
const Router = express.Router();
const Register = require("../models/userRegistration");

Router.route("/registration")
    .get(async (req, res) => {
        res.status(200).render("registration.pug");
    })
    .post(async (req, res) => {

        try {
            const password = req.body.password;
            const confirmPassword = req.body.confirmPassword;

            if (confirmPassword === password) {
                const students = new Register({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: password,
                    confirmPassword: confirmPassword,
                    roll: req.body.roll,
                    gender: req.body.gender
                });

                const registered = await students.save();
                res.status(201).send("Registration is successful");
            }
            else {
                res.send("Password are not matching");
            }

        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })

module.exports = Router;