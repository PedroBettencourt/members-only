const express = require('express');
const secretRouter = express.Router();
const secretController = require('../controllers/secretController');

secretRouter.get("/", secretController.secretGet);
secretRouter.post("/", secretController.secretPost);

module.exports = secretRouter;