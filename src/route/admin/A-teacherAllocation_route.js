const express = require("express");
const Router = express.Router();
const TeacherAllocation = require("../../models/admin/teacherAllocation");

Router.route("/teacherAllocation")
    .get(async (req, res) => {
        try {

            const teacherAllocation = await TeacherAllocation.find();
            let nameArr= teacherAllocation[0]?.Tname;
            let regNumArr =teacherAllocation[0]?.regNum;
            let deptArr =teacherAllocation[0]?.dept;
            let semArr =teacherAllocation[0]?.sem;
            let subArr =teacherAllocation[0]?.sub;
            let length = nameArr?.length;
            
            const param = {
                "content":"Teacher Allocation",
                "nameArray":nameArr,
                "regNumArray":regNumArr,
                "deptArray":deptArr,
                "semArray":semArr,
                "subArray":subArr,
                "msg":"You have not alloted anyone",
                "length":length,
                "success":req.flash("allocation-success")
            };

            res.status(200).render("admin/A-teacherAllocation.pug", param);
        }
        catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    });



module.exports = Router;