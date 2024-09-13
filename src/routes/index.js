const express = require('express');
const jwtMiddleware = require('../middlewares/jwt');
const Routes = express.Router();
const AuthRouter = require('./auth.routes');
const UserRouter = require('./user.routes');
const EmpresaRouter = require('./empresa.routes');
const EmpresaComodos = require('./empresaComodos.routes');
const EmpresaUsuarios = require('./empresaUsuarios.routes')

Routes.use('/auth', AuthRouter);
Routes.use('/users', UserRouter);
Routes.use('/empresa', EmpresaRouter);
Routes.use('/empresa-comodos', EmpresaComodos); 
Routes.use('/empresa-usuarios', EmpresaUsuarios);

Routes.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

module.exports = Routes;
