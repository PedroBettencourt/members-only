const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
require('dotenv').config();

function createGet(req, res) {
    if (!req.user) return res.redirect("/login");
    res.render("create");
};

const validateMessage = [
    body("title").trim()
        .notEmpty().withMessage("Title must not be empty")
        .matches(/^[A-Za-z0-9 ._]+$/).withMessage("Title cannot contain those characters"),
    body("text").trim()
        .notEmpty().withMessage("Text must not be empty")
        .matches(/^[A-Za-z0-9 ._]+$/).withMessage("Text cannot contain those characters"),
];

const createPost = [
    validateMessage,
    async (req, res, next) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("create", { errors: errors.array() });
        };

        const { title, text } = req.body;
        const username = req.user.username;
        const timestamp = new Date();

        try {
            await db.addMessage(title, timestamp, text, username);
            res.redirect("/");
        } catch(err) {
            return next(err);
        }
    }
]

module.exports = { createGet, createPost };