require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const routes = require('./routes');
const cookieSession = require('cookie-session');
const app = express();
const {ROUTE_NOT_FOUND} = require('./utils/messages');
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
const log4js = require('log4js');
const logger = log4js.getLogger();

const RecordNotFoundError = require('./errors/recordNotFound');
const AuthorizationError = require('./errors/authorizationError');
const {ValidationError} = require('sequelize');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.use(bodyParser.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(methodOverride());
app.use(cookieSession({
  secret: 'secret_code',
  resave: true,
  unset: 'destroy',
  saveUninitialized: false,
  cookie:  {
    path: '/',
    maxAge: TWENTY_FOUR_HOURS
  }
}));

app.use(routes);
app.use((req, res) => res.status(404).json({message: ROUTE_NOT_FOUND}));
app.use((error, req, res, next) => {
  const {message, errors} = error;
  logger.debug(error);
  logger.debug(`message: ${error.message}`);
  if (error instanceof RecordNotFoundError) {
    res.status(404).json({message});
  } else if (error instanceof AuthorizationError) {
    res.sendStatus(401);
  } else if (error instanceof ValidationError) {
    res.status(400).json({message, errors});
    logger.debug(error.messages);
  } else {
    res.status(500).json({message});
    logger.debug(error.stack);
  }
  next(error);
});

module.exports = app;
