import Joi from "joi";

const createNewColumn = async (req, res, next) => {
    const condittion = Joi.object({
        boardId: Joi.string().required(),
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
const updateColumn = async (req, res, next) => {
    const condittion = Joi.object({
        title: Joi.string().min(3).max(20).trim(),
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
    createNewColumn,
    updateColumn
}