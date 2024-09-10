const AuthController = require("../controllers/authController");

const express = require("express");
const authRouter = express.Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/login-financeiro", AuthController.loginFinanceiro);

module.exports = authRouter;
