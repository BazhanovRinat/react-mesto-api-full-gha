const express = require("express");
const mongoose = require("mongoose")
const { errors } = require('celebrate'); //
const rateLimit = require('express-rate-limit')
const bodyParser = require("body-parser")
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const errorHandler = require("./errors/errorHandler");
const NotFound = require("./errors/notFound-error")
const router = require("./routes/index")
const { requestLogger, errorLogger } = require("./middlewares/logger");

require("dotenv").config()

// //const { PORT, MONGODB_URL } = process.env

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true,
}).then(() => {
  console.log("connected to db")
})

// mongoose.connect("mongodb://10.128.0.27:27017/mestodb", {
//   useNewUrlParser: true,
// }).then(() => {
//   console.log("connected to db");
// });

const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})

app.use(limiter)

app.use(cookieParser());

app.use(helmet());

app.use(bodyParser.json())

app.use(requestLogger);

app.use(router)

app.use(errorLogger);

app.use(errors());

app.use((req, res, next) => next(new NotFound("Страница не найдена")));
app.use(errorHandler)

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
});
