const express = require("express");
const path = require("path");
const views_path = path.join(__dirname, "../views");
const static_path = path.join(__dirname, "../static");
const app = express();
const port = process.env.PORT || 80;


app.use("/static",express.static(static_path));
app.use(express.json());
app.use(urlencoded({ extended: false })); 

app.set("view engine", "pug");
app.set("views", views_path);

// * Home 

const registrationRouter = require("../src/route/registration_route");
app.use("/home", registrationRouter);


//* listen
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});

