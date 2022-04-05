import Joi from "joi";
import { ObjectId } from "mongodb";
import mogoDB from '../config/mogoDB'
//define card conlection

const cardCollectionName = 'cards';
const cardColectionSchema = Joi.object({
    boardId: Joi.string().required(),// also ObjectId when create new
    columnId: Joi.string().required(),// also ObjectId when create new
    title: Joi.string().required().min(3).max(41).trim(),
    cover: Joi.string().default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})


const validateSchema = async (data) => {
    return await cardColectionSchema.validateAsync(data, { abortEarly: false })
}

const createNewCard = async (data) => {
    try {
        const validateValue = await validateSchema(data)
        const insertValue = {
            ...validateValue,
            boardId: ObjectId(validateValue.boardId),
            columnId: ObjectId(validateValue.columnId)
        }
        let result = await mogoDB.getDB().collection(cardCollectionName).insertOne(insertValue)
        return result;
    } catch (err) {
        throw new Error(err)
    }
}
const findOneById = async (id) => {
    try {
        const result = await mogoDB.getDB().collection(cardCollectionName).findOne({ _id: ObjectId(id) })
        return result
    } catch (err) {
        throw new Error(err)
    }
}
const updateCard = async (id, data) => {
    try {
        const updateData = {
            ...data,
            boardId: ObjectId(data.boardId),
            columnId: ObjectId(data.columnId)
        }
        if (data.boardId) {
            updateData.boardId = ObjectId(data.boardId)
        }
        if (data.columnId) {
            updateData.columnId = ObjectId(data.columnId)
        }
        const result = await mogoDB.getDB().collection(cardCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: updateData },
            { returnDocument: 'after' }
        );
        return result.value;
    } catch (err) {
        throw new Error(err)
    }
}
const deleteMany = async (ids) => {
    try {
        const tranformIds = ids.map(i => ObjectId(i))
        const result = await mogoDB.getDB().collection(cardCollectionName).updateMany([
            { _id: { $in: tranformIds } },
            { $set: { _destroy: true } }
        ])
        return result
    } catch (err) {
        throw new Error(err)
    }
}
module.exports = {
    createNewCard,
    findOneById,
    updateCard,
    cardCollectionName,
    deleteMany,
    updateCard
}