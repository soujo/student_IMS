const express = require("express");
const Router = express.Router();

Router.route("/registration")
    .get(async (req, res) => { 
        res.status(200).render("registration.pug");
    })
    

module.exports=Router;