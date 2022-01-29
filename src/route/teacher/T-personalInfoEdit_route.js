const express = require("express");
const Router = express.Router();
const TeacherRegister = require("../../models/teacher/teacherRegistration");
const TeacherAllocation = require("../../models/admin/teacherAllocation");
const TeacherPersonalInfo = require("../../models/teacher/teacherPersonalInfo");
const multer = require("multer");
const { cloudinary , storage } = require("../../cloudinary/index");
const upload = multer({ storage });
let regNum;
let i = 1;

Router.route("/TpersonalInfoEdit")
    .get(async (req, res) => {

        try {

            const teacherRegNum = await TeacherRegister.findOne({ regNum });

            const firstName = teacherRegNum?.firstName;
            const lastName = teacherRegNum?.lastName;
            const email = teacherRegNum?.email;
            const gender = teacherRegNum?.gender;
            const phone = teacherRegNum?.phone;

            const teacherAllocation = await TeacherAllocation.find();

            let regNumArr = teacherAllocation[0].regNum;
            let deptArr = teacherAllocation[0].dept;
            let semArr = teacherAllocation[0].sem;
            let subArr = teacherAllocation[0].sub;
            let index = regNumArr.indexOf(`${regNum}`);
            const dept = deptArr[index];
            const sem = semArr[index];
            const sub = subArr[index];

            const TpersonalInfoRegNum = await TeacherPersonalInfo.findOne({ regNum });
            const image = TpersonalInfoRegNum?.image;

            const param = {
                "content": "Personal Info Edit",
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "phone": phone,
                "gender": gender,
                "regNum": regNum,
                "dept": dept,
                "sem": sem,
                "sub": sub,
                "image":image,
                "msg": req.flash("personalInfoEdit-err")
            }

            res.status(200).render("teacher/T-personalInfoEdit.pug", param);

        }
        catch (err) {
            console.log(err);
        }

    })

    .post(upload.single("image"), async (req, res) => {

        const personalInfoRegNum = await TeacherPersonalInfo.findOne({ regNum });
        const edit = personalInfoRegNum?.edit;
        
        if (edit == undefined) {
            
            try {
                const cloudinaryResult = await cloudinary.uploader.upload(req.file.path,{
                    folder:"Student_IMS"
                });
                const personalInfo = new TeacherPersonalInfo({
                    name: req.body.name,
                    regNum: req.body.regNum,
                    batch: req.body.batch,
                    dept: req.body.dept,
                    sem: req.body.sem,
                    sub: req.body.sub,
                    dob: req.body.dob,
                    category: req.body.category,
                    gender: req.body.gender,
                    bloodGroup: req.body.bloodGroup,
                    aadhar: req.body.aadhar,
                    fatherName: req.body.fatherName,
                    motherName: req.body.motherName,
                    email: req.body.email,
                    phone: req.body.phone,
                    address: req.body.address,
                    image: cloudinaryResult.secure_url,
                    cloudinary_id : cloudinaryResult.public_id,
                    edit: "firstTime"
                });

                const personalInfoSubmitted = await personalInfo.save();
                req.flash("personalInfo-success", "Your data has been saved !");
                res.status(200).redirect("/teacher/TpersonalInfo");                
            }
            catch (err) {
                req.flash("personalInfoEdit-err", "Some error occured.Try again !");
                res.status(400).redirect("/teacher/TpersonalInfoEdit");
                console.log(err);
            }
        }
        else {
            const id = personalInfoRegNum?.id;

            const updateDocuments = async (_id) => {
                try {

                    const prevImageID = personalInfoRegNum?.cloudinary_id;
                    const prevImgDeleted = await cloudinary.uploader.destroy(prevImageID,{
                        folder:"Student_IMS"
                    });

                    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path,{
                        folder:"Student_IMS"
                    });


                    let update = await TeacherPersonalInfo.findByIdAndUpdate(
                        { _id },
                        {
                            $set: {
                                name: req.body.name,
                                regNum: req.body.regNum,
                                batch: req.body.batch,
                                dept: req.body.dept,
                                sem: req.body.sem,
                                sub: req.body.sub,
                                dob: req.body.dob,
                                category: req.body.category,
                                gender: req.body.gender,
                                bloodGroup: req.body.bloodGroup,
                                aadhar: req.body.aadhar,
                                fatherName: req.body.fatherName,
                                motherName: req.body.motherName,
                                email: req.body.email,
                                phone: req.body.phone,
                                address: req.body.address,
                                image: cloudinaryResult.secure_url,
                                cloudinary_id : cloudinaryResult.public_id,
                                edit: `updated-${i++}`
                            }
                        },
                        {
                            new: true,
                            useFindAndModify: false
                        }
                    );

                    const updated = await update.save();
                    req.flash("personalInfo-success", "Your data has been saved !");
                    res.status(200).redirect("/teacher/TpersonalInfo");

                }
                catch (err) {
                    req.flash("personalInfoEdit-err", "Some error occured.Try again !");
                    res.status(400).redirect("/teacher/TpersonalInfoEdit");
                    console.log(err);
                }
            };

            updateDocuments(id);

        }


    })


module.exports = Router;
