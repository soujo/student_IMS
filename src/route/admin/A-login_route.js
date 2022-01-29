const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");

Router.route("/adminLogin")
    .get( (req, res) => {
        res.status(200).render("admin/A-login.pug",{
            msg:req.flash("login-err")
        });
    })
    .post( (req, res) => {

        const username = req.body.username;
        const password = req.body.password;
    
        const token = jwt.sign(
            { role: "admin" },
            process.env.SECRET_KEY
        );
    
        res.cookie("admin", token, {
            httpOnly: true
        });
    
        if(username==process.env.ADMIN_USERNAME){
            if(password==process.env.ADMIN_PASSWORD){
                res.status(200).redirect("/admin/homepage");
            }
            else{
                req.flash("login-err", "Invalid Password");
                res.redirect("/home/adminLogin");
            }
        }
        else{
            req.flash("login-err", "Invalid Credentials");
            res.redirect("/home/adminLogin");
        }
    });

module.exports = Router;