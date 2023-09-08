const { default: mongoose } = require("mongoose");
const cardModel = require("../models/card")
const NotFound = require("../errors/notFound-error")
const BadRequest = require("../errors/badRequest-error")
const Forbidden = require("../errors/forbidden-error")

const createNewCard = (req, res, next) => {
    const userId = req.user._id
    const { name, link } = req.body
    return cardModel.create({ name, link, owner: userId })
        // .then((card) => res.status(201).send({ _id: card._id }))
        .then((card) => res.status(201).send(card))
        .catch((err) => {
            if (err.name === "ValidationError") {
                return next(new BadRequest(`${Object.values(err.errors).map((error) => error.message).join(", ")}`))
            }
            return next(err)
        })
}

const deleteCard = (req, res, next) => {
    const { cardId } = req.params

    if (!mongoose.Types.ObjectId.isValid(cardId)) {
        return next(new BadRequest("Некорректный id карточки"))
    }

    return cardModel.findById(cardId)
        .then((card) => {
            if (!card) {
                return next(new NotFound("Карточка не найдена"))
            }
            if (req.user._id !== card.owner._id.toString()) {
                return next(new Forbidden("Нельзя удалить чужую карточку"))
            }
            return card.deleteOne()
                .then(() => res.status(200).send({ message: "Карточка удалена" }))
        })
        .catch((err) => {
            next(err)
        })
}

const getCards = (req, res, next) => cardModel.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => next(err));

const likeCard = (req, res, next) => {
    const { cardId } = req.params

    if (!mongoose.Types.ObjectId.isValid(cardId)) {
        return next(new BadRequest("Некорректный id карточки"))
    }
    return cardModel.findByIdAndUpdate(cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true })
        .then((card) => {
            if (!card) {
                return next(new NotFound("Карточка не найдена"))
            }
            return res.status(200).send(card)
        })
        .catch((err) => {
            next(err)
        })
}

const dislakeCards = (req, res, next) => {
    const { cardId } = req.params

    if (!mongoose.Types.ObjectId.isValid(cardId)) {
        return next(new BadRequest("Некорректный id карточки"))
    }

    return cardModel.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
        .then((card) => {
            if (!card) {
                return next(new NotFound("Карточка не найдена"))
            }
            if (!cardId) {
                return next(new BadRequest("Неправильный Id карточки"))
            }
            return res.status(200).send(card)
        })
        .catch((err) => {
            next(err)
        })
}

module.exports = { createNewCard, deleteCard, getCards, likeCard, dislakeCards }
