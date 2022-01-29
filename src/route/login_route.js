const express = require("express");
const Router = express.Router();
const Register = require("../models/userRegistration");
const bcrypt = require("bcryptjs");

Router.route("/studentLogin")

    .get((req, res) => {
        res.status(200).render("login.pug",
            {
                msg: req.flash("login-err"),
                login_msg: req.flash("reg-success")
            });
    })
    .post(async (req, res) => {
        try {
            const roll = req.body.roll;
            const password = req.body.password;

            const userRoll = await Register.findOne({ roll });

            const token = await userRoll?.generateAuthToken();
            res.cookie("student", token, {
                httpOnly: true
            });
            
            const isMatch = await bcrypt.compare(password, userRoll?.password);
            if (isMatch) {
                res.status(200).redirect("/student/homepage");
            }
            else {
                req.flash("login-err", "Invalid Credentials");
                res.redirect("/home/studentLogin");
            }
        }
        catch (err) {
            console.log(err);
            req.flash("login-err", "Roll number is not registered in our system ! Kindly register");
            res.redirect("/home/studentLogin");
        }
    });

module.exports = Router;