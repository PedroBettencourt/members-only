// AUTHENTICATION
const passport = require('passport');
const db = require("../db/pool");


async function loginGet(req, res) {
    console.log(await db.query("SELECT * FROM users"));
    res.render("login");
};

const loginPost = (
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })
);

module.exports = { loginGet, loginPost };