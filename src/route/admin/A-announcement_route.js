const express= require("express");
const Router = express.Router();
const Announcement = require("../../models/teacher/teacherAnnouncement");
const auth = require("../../middleware/authAdmin");

Router.route("/announcement")
    .get(auth,async(req,res)=>{
        try{
            
            const param={
                "content":"Announcement",
                "msg":req.flash("announcement-success")
            }
            res.status(200).render("admin/A-announcement.pug",param);

        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })
    .post(async (req, res) => {

        try {

            const announcements = new Announcement({
                heading:req.body.heading,
                desc:req.body.desc,
                by:req.body.by
            })

            const annoucementSubmitted = await announcements.save();
            req.flash("announcement-success","Your announcement is posted !");
            res.status(201).redirect("/admin/announcement");

        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }

})

module.exports=Router;