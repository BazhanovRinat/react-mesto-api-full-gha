const router = require("express").Router();
// const { errors } = require('celebrate');

const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'https://bazhanov.rinat.nomoredomainsicu.ru',
  'https://api.bazhanov.rinat.nomore.nomoredomainsicu.ru',
  'http://bazhanov.rinat.nomoredomainsicu.ru',
  'https://api.bazhanov.rinat.nomore.nomoredomainsicu.ru',
];

const usersRouter = require("./users");
const cardRouter = require("./card");

router.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers["access-control-request-headers"];
  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  if (method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", `${requestHeaders}, Content-Type`);
    return res.end();
  }
  return next();
});

router.use(usersRouter)
router.use(cardRouter)

// router.use(errors());

module.exports = router
