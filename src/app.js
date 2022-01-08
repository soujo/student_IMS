const express = require("express");
const path = require("path");
require("dotenv").config();
const views_path = path.join(__dirname, "../views");
const static_path = path.join(__dirname, "../static");
const app = express();
const port = process.env.PORT || 80;
const bcrypt = require("bcryptjs");
const Register = require("../src/models/userRegistration");
const TeacherRegister = require("../src/models/teacher/teacherRegistration");

const session = require("express-session");
const flash =require("connect-flash");
let roll;


app.use("/static",express.static(static_path));
app.use(express.json());
app.use(urlencoded({ extended: false })); 
app.use(session({
    secret:"secret",
    cookie:{},
    resave:false,
    saveUninitialized:false
}));
app.use(flash());

app.set("view engine", "pug");
app.set("views", views_path);


app.get("/home/studentLogin", (req, res) => {
    res.status(200).render("login.pug",
    {
        msg:req.flash("login-err"),
        login_msg:req.flash("reg-success")
    });
});

app.get("/home/teacherLogin", (req, res) => {
    res.status(200).render("teacher/T-login.pug");
});

app.get("/home/adminLogin", (req, res) => {
    res.status(200).render("admin/A-login.pug");
});

app.post("/home/studentLogin",async (req, res) => {
    try {
        roll = req.body.roll;
        exports.roll=roll;
        const password = req.body.password;

        const userRoll = await Register.findOne({ roll });

        const isMatch = await bcrypt.compare(password, userRoll?.password);
        if (isMatch) {
            res.status(200).redirect("/student/homepage");
        }
        else {
            req.flash("login-err","Invalid Password");
            res.redirect("/home/studentLogin");
        }
    }
    catch (err) {
        console.log(err);
        req.flash("login-err","Invalid Roll");
        res.redirect("/home/studentLogin");
    }
});

app.post("/home/teacherLogin",async (req, res) => {
    try {
        regNum = req.body.regNum;
        const password = req.body.password;

        const teacherRegNum = await TeacherRegister.findOne({ regNum });

        const isMatch = await bcrypt.compare(password, teacherRegNum?.password);
        if (isMatch) {
            res.status(200).redirect("/teacher/homepage");
        }
        else {
            res.status(400).send("Invalid password details");
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

app.post("/home/adminLogin", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if(username==process.env.ADMIN_USERNAME){
        if(password==process.env.ADMIN_PASSWORD){
            res.status(200).redirect("/admin/homepage");
        }
        else{
            res.status(401).send("Invalid Password");
        }
    }
    else{
        res.status(401).send("Invalid Credentials");
    }
});

// * Home 

const registrationRouter = require("../src/route/registration_route");
app.use("/home", registrationRouter);

const teacherRegistrationRouter = require("../src/route/teacher/T-registration_route");
app.use("/home",teacherRegistrationRouter);


//* Student
const studentRouter = require("../src/route/student_route");
app.use("/student", studentRouter);

const feedbackRouter = require("../src/route/feedback_route");
app.use("/student", feedbackRouter);

const personalInfoRouter = require("../src/route/personalInfo_route");
app.use("/student", personalInfoRouter);

const personalInfoEditRouter = require("../src/route/personalInfoEdit_route");
app.use("/student", personalInfoEditRouter);

const academicsRouter = require("../src/route/academics_route");
app.use("/student", academicsRouter);

const academicsEditRouter = require("../src/route/academicsEdit_route");
app.use("/student", academicsEditRouter);

const achievementRouter = require("../src/route/achievements_route");
app.use("/student", achievementRouter);

const achievementEditRouter = require("../src/route/achievementEdit_route");
app.use("/student", achievementEditRouter);


const pyqRouter = require("../src/route/pyq_route");
app.use("/student", pyqRouter);

const clubsRouter = require("../src/route/clubs_route");
app.use("/student", clubsRouter);


const booksRouter = require("../src/route/books_route");
app.use("/student", booksRouter);


//* Teacher

const teacherRouter = require("../src/route/teacher/T-teacher_route");
app.use("/teacher",teacherRouter);

const teacherPersonalInfoRouter = require("../src/route/teacher/T-personalInfo_route");
app.use("/teacher",teacherPersonalInfoRouter);

const teacherAnnouncementRouter = require("../src/route/teacher/T-announcement_route");
app.use("/teacher",teacherAnnouncementRouter);

const studentResultRouter = require("../src/route/teacher/T-studentResult_route");
app.use("/teacher",studentResultRouter);

const studentAttendanceRouter = require("../src/route/teacher/T-studentAttendance_route");
app.use("/teacher",studentAttendanceRouter);

const studentAttendanceEditRouter = require("../src/route/teacher/T-studentAttendanceEdit_route");
app.use("/teacher",studentAttendanceEditRouter);

const teacherFeedbackRouter = require("../src/route/teacher/T-feedback_route");
app.use("/teacher",teacherFeedbackRouter);

//* Admin

const adminRouter = require("../src/route/admin/A-admin_route");
app.use("/admin", adminRouter);

const feedbacksRouter = require("../src/route/admin/A-feedback_route");
app.use("/admin", feedbacksRouter);

const announcementRouter = require("../src/route/admin/A-announcement_route");
app.use("/admin", announcementRouter);


//* listen
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});

