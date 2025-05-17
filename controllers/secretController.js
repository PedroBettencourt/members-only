const db = require("../db/queries");
require('dotenv').config();

function secretGet(req, res) {
    res.render("secret");
};

async function secretPost(req, res) {
    const password = req.body.password;
    if (password === process.env.SECRET) await db.upgradeUser(id);

    res.redirect("/");
};

module.exports = { secretGet, secretPost };