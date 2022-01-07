const express = require("express");
const Router = express.Router();

Router.route("/feedbacks")
    .get(async (req, res) => {
        try {
            const param = {
                "content": "Feedbacks",
            }
            res.status(200).render("admin/A-feedback.pug", param);

        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    });

module.exports = Router;