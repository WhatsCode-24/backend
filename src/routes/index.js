const express = require('express');
const jwtMiddleware = require('../middlewares/jwt');
const Routes = express.Router();
const AuthRouter = require('./auth.routes');
const UserRouter = require('./user.routes');
const EmpresaRouter = require('./empresa.routes');
const EmpresaComodosRouter = require('./empresaComodos.routes');
const EmpresaUsuariosRouter = require('./empresaUsuarios.routes')
const ComodoPortasRouter = require('./comodoPortas.routes')
const ComodoAcesso = require('./comodoAcesso.routes');

Routes.use('/auth', AuthRouter);
Routes.use('/users', jwtMiddleware, UserRouter);
Routes.use('/empresa-usuarios', jwtMiddleware, EmpresaUsuariosRouter);
Routes.use('/empresa', jwtMiddleware, EmpresaRouter);
Routes.use('/empresa-comodos', jwtMiddleware, EmpresaComodosRouter); 
Routes.use('/comodo-portas', jwtMiddleware, ComodoPortasRouter);
Routes.use('/comodo-acesso', jwtMiddleware, ComodoAcesso);

Routes.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

module.exports = Routes;
