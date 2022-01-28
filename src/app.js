const express = require("express");
const path = require("path");
require("dotenv").config();
require("../src/db/conn");
const views_path = path.join(__dirname, "../views");
const static_path = path.join(__dirname, "../static");
const app = express();
const port = process.env.PORT || 80;
const session = require("express-session");
const flash = require("connect-flash");

app.use("/static", express.static(static_path));
app.use(express.json());
app.use(flash());
app.use(session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {},
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "pug");
app.set("views", views_path);

app.get("/home", (req, res) => {
    res.status(200).render("index.pug");
});


// * Home Route -

//* Student
const studentRegistrationRouter = require("../src/route/registration_route");
app.use("/home", studentRegistrationRouter);

const studentLoginRouter = require("../src/route/login_route");
app.use("/home", studentLoginRouter);

//* Teacher
const teacherRegistrationRouter = require("../src/route/teacher/T-registration_route");
app.use("/home", teacherRegistrationRouter);

const teacherLoginRouter = require("../src/route/teacher/T-login_route");
app.use("/home", teacherLoginRouter);


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

const resultRouter = require("../src/route/result_route");
app.use("/student", resultRouter);

const pyqRouter = require("../src/route/pyq_route");
app.use("/student", pyqRouter);

const clubsRouter = require("../src/route/clubs_route");
app.use("/student", clubsRouter);

const attendanceRouter = require("../src/route/attendance_route");
app.use("/student", attendanceRouter);

const booksRouter = require("../src/route/books_route");
app.use("/student", booksRouter);

const timetableRouter = require("../src/route/timetable_route");
app.use("/student", timetableRouter);

const classMaterialsRouter = require("../src/route/classMaterials_route");
app.use("/student", classMaterialsRouter);

//* Teacher Route

const teacherRouter = require("../src/route/teacher/T-teacher_route");
app.use("/teacher", teacherRouter);

const teacherPersonalInfoRouter = require("../src/route/teacher/T-personalInfo_route");
app.use("/teacher", teacherPersonalInfoRouter);

const teacherPersonalInfoEditRouter = require("../src/route/teacher/T-personalInfoEdit_route");
app.use("/teacher", teacherPersonalInfoEditRouter);

const teacherAnnouncementRouter = require("../src/route/teacher/T-announcement_route");
app.use("/teacher", teacherAnnouncementRouter);

const studentResultRouter = require("../src/route/teacher/T-studentResult_route");
app.use("/teacher", studentResultRouter);

const studentResultEditRouter = require("../src/route/teacher/T-studentResultEdit_route");
app.use("/teacher", studentResultEditRouter);

const studentAttendanceRouter = require("../src/route/teacher/T-studentAttendance_route");
app.use("/teacher", studentAttendanceRouter);

const studentAttendanceEditRouter = require("../src/route/teacher/T-studentAttendanceEdit_route");
app.use("/teacher", studentAttendanceEditRouter);

const studentClassMaterialsRouter = require("../src/route/teacher/T-classMaterial_route");
app.use("/teacher", studentClassMaterialsRouter);

const teacherFeedbackRouter = require("../src/route/teacher/T-feedback_route");
app.use("/teacher", teacherFeedbackRouter);

//* Admin Route

const adminRouter = require("../src/route/admin/A-admin_route");
app.use("/admin", adminRouter);

const teacherAllocationRouter = require("../src/route/admin/A-teacherAllocation_route");
app.use("/admin", teacherAllocationRouter);

const teacherAllocationEditRouter = require("../src/route/admin/A-teacherAllocationEdit_route");
app.use("/admin", teacherAllocationEditRouter);

const feedbacksRouter = require("../src/route/admin/A-feedback_route");
app.use("/admin", feedbacksRouter);

const timetableUploadRouter = require("../src/route/admin/A-timetable_route");
app.use("/admin", timetableUploadRouter);

const announcementRouter = require("../src/route/admin/A-announcement_route");
app.use("/admin", announcementRouter);


//* listen
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});