const express = require('express');
const loginRouter = express.Router();
const loginController = require('../controllers/loginController');
const passport = require('passport');

loginRouter.get("/", loginController.loginGet);
loginRouter.post("/", loginController.loginPost);

module.exports = loginRouter;