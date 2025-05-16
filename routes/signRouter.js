const express = require('express');
const signRouter = express.Router();
const signController = require('../controllers/signController');

signRouter.get("/", signController.signupGet);
signRouter.post("/", signController.signupPost);

module.exports = signRouter;