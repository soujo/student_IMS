const express= require("express");
const Router = express.Router();
const Timetable = require("../../models/admin/timetable");
const timetableImport = require("../../multer/timetable");
const upload = timetableImport.upload;

Router.route("/timetable")
    .get(async(req,res)=>{
        try{
            const param={
                "content":"TImetable",
                "msg":req.flash("timetable-upload"),
                "err":req.flash("timetable-err")
            }
            res.status(200).render("admin/A-timetable.pug",param);

        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })

    .post(upload.single("pdf"),async(req,res)=>{
        try{
            const timetable= new Timetable({
                heading:req.body.heading,
                pdf:req.file.filename
            });

            const timetableUpdated = await timetable.save();
            req.flash("timetable-upload","Timetable has been uploaded !");
            res.status(200).redirect("/admin/timetable");
        }
        catch(err){
            req.flash("timetable-err","Some error occured. Try again after some time !");
            res.status(200).redirect("/admin/timetable");
        }
    })

module.exports=Router;