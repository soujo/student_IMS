const express = require("express");
const Router = express.Router();
const TeacherRegister = require("../../models/teacher/teacherRegistration");

Router.route("/teacherRegistration")
    .get(async (req, res) => { 
        res.status(200).render("teacher/T-registration.pug",{
            msg:req.flash("pass-err"),
            dup_err:req.flash("duplicate")
        });
    })
    .post(async (req, res) => {
        try {
            const password = req.body.password;
            const confirmPassword = req.body.confirmPassword;

            if (confirmPassword === password) {
                const teachers = new TeacherRegister({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: password,
                    confirmPassword: confirmPassword,
                    regNum: req.body.regNum,
                    gender: req.body.gender
                });

                const registered = await teachers.save();   
                req.flash("reg-success","Registration is successful ! \n You can login now");
                res.status(201).redirect("/home/teacherLogin");
            }
            else {
                req.flash("pass-err","Password and confirm password should be different !");
                res.redirect("/home/teacherRegistration");
            }

        }
        catch (err) {
            req.flash("duplicate","Registration Number and email are already registered !");
            res.redirect("/home/teacherRegistration");
        }
    })

module.exports=Router;