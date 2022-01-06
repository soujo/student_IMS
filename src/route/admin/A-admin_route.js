const express = require("express");
const Router = express.Router();
 
Router.route("/homepage")
    .get( async (req, res) => {
        try {
            const param = {
                "content":"Information Management System"              
            };

            res.status(200).render("admin/A-admin.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    });

module.exports = Router;