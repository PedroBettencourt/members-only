// AUTHENTICATION
const passport = require('passport');
const db = require("../db/pool");


async function loginGet(req, res) {
    res.render("login");
};

const loginPost = (
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })
);

module.exports = { loginGet, loginPost };