const express = require("express");
const Router = express.Router();
const TeacherRegister = require("../../models/teacher/teacherRegistration");
const TeacherAllocation = require("../../models/admin/teacherAllocation");

Router.route("/teacherAllocationEdit")
    .get(async (req, res) => {
        try {
            const teachers = await TeacherRegister.find();

            const param = {
                "content": "Teacher Allocation Edit",
                "teachers": teachers,
                "msg":req.flash("allocation-err")
            };

            res.status(200).render("admin/A-teacherAllocationEdit.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    })

    .post(async (req, res) => {

        const teachersArr = await TeacherAllocation.find();
        const edit = teachersArr[0]?.edit[0];
        const id = teachersArr[0]?.id;

        if (edit === undefined) {
            try {

                const teachers = new TeacherAllocation({
                    Tname: req.body.name,
                    regNum: req.body.regNum,
                    dept: req.body.dept,
                    sem: req.body.sem,
                    sub: req.body.sub,
                    edit: "0"
                });

                const teachersAllocated = await teachers.save();
                req.flash("allocation-success","Teachers has been allocated !");
                res.status(201).redirect("/admin/teacherAllocation");
            }
            catch (err) {
                req.flash("allocation-err","Some error occured. Try again later !");
                res.status(201).redirect("/admin/teacherAllocationEdit");
            }

        }
        else {

            const updateDocuments = async (_id) => {
                try {
                    let i = 1;
                    let update = await TeacherAllocation.findByIdAndUpdate(
                        { _id },
                        {
                            $set: {
                                Tname: req.body.name,
                                regNum: req.body.regNum,
                                dept: req.body.dept,
                                sem: req.body.sem,
                                sub: req.body.sub,
                                edit: `${i++}`
                            }
                        },
                        {
                            new: true,
                            useFindAndModify: false
                        }
                    )
                    const updated = await update.save();
                    req.flash("allocation-success","Teachers has been allocated !");
                    res.status(201).redirect("/admin/teacherAllocation");
                }
                catch (err) {
                    req.flash("allocation-err","Some error occured. Try again later !");
                    res.status(201).redirect("/admin/teacherAllocationEdit");
                }
            };

            updateDocuments(id);

        }
    })



module.exports = Router;