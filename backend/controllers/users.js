const bcrypt = require("bcrypt"); //
const userModel = require("../models/user");
const { getJwtToken } = require("../utils/jwt");
const UnauthorizedError = require("../errors/unauthorized-error");
const NotFound = require("../errors/notFound-error");
const BadRequest = require("../errors/badRequest-error");
const Conflict = require("../errors/conflict-error");

const SALT_ROUNDS = 10;

const getUsers = (req, res, next) => userModel.find({})
  .then((users) => res.status(200).send(users))
  .catch((err) => {
    next(err)
  })

const getUserById = (req, res, next) => {
  const { userId } = req.params

  return userModel.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new NotFound("Пользователь не найден"))
      }
      return res.status(200).send({ user })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest("Неправильный Id пользователя"))
      }
      return next(err)
    })
}

const createNewUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body

  return bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => userModel.create({ name, about, avatar, email, password: hash }))
    .then((user) => {
      const userNoPassword = user.toObject();
      delete userNoPassword.password;

      return res.status(201).send(userNoPassword);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new Conflict("Такой пользователь уже существует"))
      }
      if (err.name === "ValidationError") {
        return next(new BadRequest(`${Object.values(err.errors).map((errror) => errror.message).join(", ")}`))
      }
      return next(err)
    })
}

const patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body

  return userModel.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    // .orFail(new Error("Error"))
    .then((user) => {
      if (!user) {
        return next(new NotFound("Пользователь не найден"))
      }
      return res.status(200).send({ avatar })
    })
    .catch((err) => {
      // if (err.name === "Error") {
      //   return res.status(404).send({ message: "Пользователь не найден" });
      // }
      if (err.name === "ValidationError") {
        return next(new BadRequest(`${Object.values(err.errors).map((error) => error.message).join(", ")}`))
      }
      return next(err)
    })
}

const patchUser = (req, res, next) => {
  const { name, about } = req.body

  return userModel.findByIdAndUpdate(req.user._id, { name, about },
    { new: true, runValidators: true })
    // .orFail(new Error("Error"))
    .then((user) => {
      if (!user) {
        return next(new NotFound("Пользователь не найден"))
      }
      return res.status(200).send({ name, about })
    })
    .catch((err) => {
      // if (err.name === "Error") {
      //   return res.status(404).send({ message: "Пользователь не найден" });
      // }
      if (err.name === "ValidationError") {
        return next(new BadRequest(`${Object.values(err.errors).map((error) => error.message).join(", ")}`))
      }
      return next(err)
    })
}

const login = (req, res, next) => {
  const { email, password } = req.body

  return userModel.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError("Пользователь не найден"))
      }
      return bcrypt.compare(password, user.password)
        .then((isValidPassword) => {
          if (!isValidPassword) {
            return next(new UnauthorizedError("Пароль не верный"));
          }
          const token = getJwtToken({ _id: user._id });

          res.cookie("jwt", token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          })
          return res.status(200).send({ token })
        });
    })
    .catch((err) => {
      next(err)
    })
}

const getCurrentUser = (req, res, next) => {
  userModel.findById(req.user._id)
    .then((user) => {
      if (!user) return next(new NotFound("Пользователь не найден"))
      return res.status(200).send(user)
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = {
  getUsers,
  getUserById,
  createNewUser,
  patchUser,
  patchUserAvatar,
  login,
  getCurrentUser,
};
