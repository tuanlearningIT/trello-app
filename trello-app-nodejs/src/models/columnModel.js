import Joi from "joi";
import mogoDB from '../config/mogoDB';
import { ObjectId } from "mongodb";
//define column conlection

const columnCollectionName = 'columns';
const columnColectionSchema = Joi.object({
    boardId: Joi.string().required(), // also ObjectId when create new
    title: Joi.string().required().min(3).max(20).trim(),
    cardOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})


const validateSchema = async (data) => {
    return await columnColectionSchema.validateAsync(data, { abortEarly: false })
}

const createNewColumn = async (data) => {
    try {
        const validateValue = await validateSchema(data)
        const insertValue = {
            ...validateValue,
            boardId: ObjectId(validateValue.boardId)
        }
        let result = await mogoDB.getDB().collection(columnCollectionName).insertOne(insertValue)
        return result;
    } catch (err) {
        throw new Error(err)
    }
}
const findOneById = async (id) => {
    try {
        const result = await mogoDB.getDB().collection(columnCollectionName).findOne({ _id: ObjectId(id) })
        return result
    } catch (err) {
        throw new Error(err)
    }
}
const pushCardOrder = async (clumnId, cardId) => {
    try {
        const result = await mogoDB.getDB().collection(columnCollectionName).findOneAndUpdate(
            { _id: ObjectId(clumnId) },
            { $push: { cardOrder: cardId } },
            { returnDocument: 'after' }
        );
        return result;
    } catch (error) {
        throw new Error(error)
    }
}
const updateColumn = async (id, data) => {
    try {
        const updateData = {
            ...data,
            boardId: ObjectId(data.boardId)
        }
        if (data.boardId) {
            updateData.boardId = ObjectId(data.boardId)
        }
        const result = await mogoDB.getDB().collection(columnCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: updateData },
            { returnDocument: 'after' }
        );
        return result.value;
    } catch (err) {
        throw new Error(err)
    }
}
module.exports = {
    createNewColumn,
    findOneById,
    updateColumn,
    pushCardOrder,
    columnCollectionName
}