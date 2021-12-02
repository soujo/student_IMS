const express = require("express");
const path = require("path");
const views_path = path.join(__dirname, "../views");
const static_path = path.join(__dirname, "../static");
const app = express();
const port = process.env.PORT || 80;
const bcrypt = require("bcryptjs");
const Register = require("../src/models/userRegistration");
let roll;


app.use("/static",express.static(static_path));
app.use(express.json());
app.use(urlencoded({ extended: false })); 

app.set("view engine", "pug");
app.set("views", views_path);

app.get("/login", (req, res) => {
    res.status(200).render("login.pug");
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
            res.status(400).send("Invalid password details");
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
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



//* listen
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});

