const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies?.teacher;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        next();
    }
    catch (err) {
        req.flash("login-err","Your session is expired. Please login again !");
        res.status(200).redirect("/home/teacherLogin");
    }
};


module.exports = auth;