const db = require("../db/queries");
require('dotenv').config();

function secretGet(req, res) {
    res.render("secret");
};

async function secretPost(req, res) {
    const secret = req.body.secret;
    if (!req.user) return res.redirect("/login");
    if (secret === process.env.SECRET) {
        await db.upgradeUser(req.user.id);
    };

    const adminPass = req.body.admin;
    if (adminPass === process.env.ADMIN) {
        await db.upgradeAdmin(req.user.id);
    }

    res.redirect("/");
};

module.exports = { secretGet, secretPost };