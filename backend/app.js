const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const errorHandler = require('./errors/errorHandler');
const NotFound = require('./errors/notFound-error');
const router = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

require('dotenv').config();

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'https://bazhanov.rinat.nomoredomainsicu.ru',
  'https://api.bazhanov.rinat.nomore.nomoredomainsicu.ru',
  'http://bazhanov.rinat.nomoredomainsicu.ru',
  'https://api.bazhanov.rinat.nomore.nomoredomainsicu.ru',
];

const { PORT = 3000, MONGODB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log('connected to db');
});

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use(helmet());

app.use(express.json());

app.use(requestLogger);

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', `${requestHeaders}, Content-Type`);
    return res.end();
  }
  return next();
});

app.use(router);

app.use((req, res, next) => next(new NotFound('Страница не найдена')));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
