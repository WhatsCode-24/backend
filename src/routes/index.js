const express = require('express');
const jwtMiddleware = require('../middlewares/jwt');
const Routes = express.Router();
const AuthRouter = require('./auth.routes');
Routes.use('/auth', AuthRouter);

Routes.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

module.exports = Routes;
