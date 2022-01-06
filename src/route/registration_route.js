const express = require("express");
const Router = express.Router();
const Register = require("../models/userRegistration");

Router.route("/registration")
    .get(async (req, res) => {
        res.status(200).render("registration.pug",{
            msg:req.flash("pass-err"),
            dup_err:req.flash("duplicate")
        });
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
                req.flash("reg-success","Registration is successful ! \n You can login now");
                res.status(201).redirect("/home/studentLogin");
            }
            else {
                req.flash("pass-err","Password and confirm password should be different !");
                res.redirect("/home/registration");
            }

        }
        catch (err) {
            req.flash("duplicate","Roll and email are already registered !");
            res.redirect("/home/registration");
        }
    })

module.exports = Router;