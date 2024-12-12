const serverless = require('serverless-http');
const cors = require('cors');
const express = require('express');
const app = express();
// const corsConfig = require("./src/config/cors");
const corsMiddleware = require('./src/config/cors');
// const logRequestsResponses = require("./src/middlewares/logsMiddleware");

const routes = require('./src/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://ec2-3-87-116-220.compute-1.amazonaws.com', // Substitua pelo domínio que você quer permitir
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
// app.use(cors(corsConfig));
// app.use(corsMiddleware);
// app.use(logRequestsResponses);
app.use(routes);

module.exports.handler = serverless(app);
