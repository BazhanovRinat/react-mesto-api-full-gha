const router = require('express').Router();
// const { errors } = require('celebrate');

const usersRouter = require('./users');
const cardRouter = require('./card');

router.use(usersRouter);
router.use(cardRouter);

// router.use(errors());

module.exports = router;
