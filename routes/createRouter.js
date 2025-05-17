const express = require('express');
const createRouter = express.Router();
const createController = require('../controllers/createController');

createRouter.get("/", createController.createGet);
createRouter.post("/", createController.createPost);

module.exports = createRouter;