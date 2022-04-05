import Joi from "joi";

const createNewCard = async (req, res, next) => {
    const condittion = Joi.object({
        boardId: Joi.string().required(),
        columnId: Joi.string().required(),
        title: Joi.string().required().min(3).max(41).trim(),
    })
    try {
        await condittion.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (err) {
        res.status(400).json({
            errCode: new Error(err).message
        })
    }
}
const updateCard = async (req, res, next) => {
    const condittion = Joi.object({
        title: Joi.string().min(3).max(41).trim(),
        boardId: Joi.string(),
        columnId: Joi.string(),
    })
    try {
        await condittion.validateAsync(req.body, {
            abortEarly: false,
            allowUnknown: true
        })
        next()
    } catch (err) {
        res.status(400).json({
            errCode: new Error(err).message
        })
    }
}
module.exports = {
    createNewCard,
    updateCard
}