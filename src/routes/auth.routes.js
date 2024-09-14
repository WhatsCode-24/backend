const express = require('express');
const AuthController = require('../controllers/authController');
const authRouter = express.Router();

authRouter.post("/login", AuthController.login);

module.exports = authRouter;
