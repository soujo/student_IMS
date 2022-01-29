const express = require("express");
const Router = express.Router();
const TeacherRegister = require("../../models/teacher/teacherRegistration");
const bcrypt = require("bcryptjs");

Router.route("/teacherLogin")
    .get( (req, res) => {
        res.status(200).render("teacher/T-login.pug",{
            msg: req.flash("login-err"),
            login_msg: req.flash("reg-success")
        });
    })

    .post( async (req, res) => {
        try {

            const regNum = req.body.regNum;
            const password = req.body.password;
    
            const teacherRegNum = await TeacherRegister.findOne({ regNum });
            
            const token = await teacherRegNum?.generateAuthTeacherToken();    
            res.cookie("teacher", token, {
                httpOnly: true
            });
    
            const isMatch = await bcrypt.compare(password, teacherRegNum?.password);
            if (isMatch) {
                res.status(200).redirect("/teacher/homepage");
            }
            else {
                req.flash("login-err", "Invalid Credentials");
                res.redirect("/home/teacherLogin");
            }
        }
        catch (err) {
            console.log(err);
            req.flash("login-err", "Registration number is not registered in our system ! Kindly register");
            res.redirect("/home/teacherLogin");
        }
    });



module.exports = Router;