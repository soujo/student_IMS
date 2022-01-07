const express = require("express");
const Router = express.Router();
const Feedback = require("../../models/feedback");

Router.route("/feedbacks")
    .get(async (req, res) => {
        try {
            const feedbacks = await Feedback.find();
            const param = {
                "content": "Feedbacks",
                "feedbackArray": feedbacks,
                "msg": "No feedback by anyone"
            }
            res.status(200).render("admin/A-feedback.pug", param);

        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    });

module.exports = Router;