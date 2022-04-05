import Joi from "joi";

const createNewBoard = async (req, res, next) => {
    const condittion = Joi.object({
        title: Joi.string().required().min(3).max(20).trim(),
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
const updateBoard = async (req, res, next) => {
    const condittion = Joi.object({
        title: Joi.string().required().min(3).max(20).trim(),
        columnOrder: Joi.array().items(Joi.string()),
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
    createNewBoard,
    updateBoard
}