const express = require("express");
const path = require("path");
const views_path = path.join(__dirname, "../views");
const static_path = path.join(__dirname, "../static");
const app = express();
const port = process.env.PORT || 80;
const bcrypt = require("bcryptjs");
const Register = require("../src/models/userRegistration");

const session = require("express-session");
const flash =require("connect-flash");
let roll;


app.use("/static",express.static(static_path));
app.use(express.json());
app.use(urlencoded({ extended: false })); 

app.use(session({
    secret:"secret",
    cookie:{message:60000},
    resave:false,
    saveUninitialized:false
}));
app.use(flash());

app.set("view engine", "pug");
app.set("views", views_path);

app.get("/login", (req, res) => {
    res.status(200).render("login.pug",
    {
        msg:req.flash("login-err"),
        login_msg:req.flash("reg-success")
    });
});


app.post("/login",async (req, res) => {
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
            res.redirect("/login");
        }
    }
    catch (err) {
        console.log(err);
        req.flash("login-err","Invalid Roll");
        res.redirect("/login");
    }
});

// * Home 

const registrationRouter = require("../src/route/registration_route");
app.use("/home", registrationRouter);


//* Student
const studentRouter = require("../src/route/student_route");
app.use("/student", studentRouter);

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


//* listen
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});

