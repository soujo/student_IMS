const express = require("express");
const Router = express.Router();
const TeacherRegister = require("../../models/teacher/teacherRegistration");

Router.route("/teacherRegistration")
    .get(async (req, res) => { 
        res.status(200).render("teacher/T-registration.pug");
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
                res.status(201).redirect("/home/teacherLogin");
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

module.exports=Router;