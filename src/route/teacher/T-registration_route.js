const express = require("express");
const Router = express.Router();

Router.route("/teacherRegistration")
    .get(async (req, res) => { 
        res.status(200).render("teacher/T-registration.pug");
    })

module.exports=Router;