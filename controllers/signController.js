const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const bcrypt = require('bcryptjs');

function signupGet(req, res) {
    res.render("sign-up");
};

const validateUser = [
    body("firstName").trim()
        .notEmpty().withMessage("First name must not be empty")
        .isAlpha().withMessage("First name must only contain letters"),
    body("lastName").trim()
        .notEmpty().withMessage("Last name must not be empty")
        .isAlpha().withMessage("Last name must only contain letters"),
    body("username").trim()
        .notEmpty().withMessage("Username must not be empty")
        .matches(/^[A-Za-z0-9 ._]+$/).withMessage("Username cannot contain those characters"),
    body("password").trim()
        .notEmpty().withMessage("Password must not be empty")
        .matches(/^[A-Za-z0-9 ._]+$/).withMessage("Password cannot contain those characters"),
    body("passwordRepeat").trim()
        .notEmpty().withMessage("Password must not be empty")
        .matches(/^[A-Za-z0-9 ._]+$/)
];

const signupPost = [
    validateUser, 
    async (req, res, next) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("sign-up", { errors: errors.array() })
        };
        
        const { firstName, lastName, username, password, passwordRepeat } = req.body;
        
        // Check if passwords match
        if (password !== passwordRepeat) {
            return res.status(400).render("sign-up", { errors: [{ msg: "passwords don't match" }] });
        };

        // Hash password and store new user
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.addUser(firstName, lastName, username, hashedPassword);
            res.redirect("/secret");
        } catch (error) {
            console.error(error);
            next(error);
        };
    }
];

module.exports = { signupGet, signupPost};