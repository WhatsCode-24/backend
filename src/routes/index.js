const express = require('express');
// const jwtMiddleware = require('../middlewares/jwt');
const Routes = express.Router();
// const AuthRouter = require('./auth.routes');
const UserRouter = require('./user.routes');

// Routes.use('/auth', AuthRouter);
Routes.use('/users', UserRouter);

Routes.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

module.exports = Routes;
