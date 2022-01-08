const express= require("express");
const Router = express.Router();
const Announcement = require("../../models/teacher/teacherAnnouncement");

Router.route("/announcement")
    .get(async(req,res)=>{
        try{
            
            const param={
                "content":"Announcement"
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

            const annoucements = new Announcement({
                heading:req.body.heading,
                desc:req.body.desc,
                by:req.body.by
            })

            const annoucementSubmitted = await annoucements.save();
            res.status(201).redirect("/admin/announcement");

        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }

})

module.exports=Router;