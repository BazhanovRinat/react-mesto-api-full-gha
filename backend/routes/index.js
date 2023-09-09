const router = require('express').Router();

const usersRouter = require('./users');
const cardRouter = require('./card');

router.use(usersRouter);
router.use(cardRouter);

module.exports = router;
