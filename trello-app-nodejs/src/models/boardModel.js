import Joi from "joi";
import { ObjectId } from "mongodb";
import mogoDB from '../config/mogoDB';
import columnModel from '../models/columnModel';
import cardModel from '../models/cardModel';
//define board conlection

const boardCollectionName = 'boards';
const boardColectionSchema = Joi.object({
    title: Joi.string().required().min(3).max(20).trim(),
    columnOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await boardColectionSchema.validateAsync(data, { abortEarly: false })
}

const createNewBoard = async (data) => {
    try {
        const values = await validateSchema(data)
        let result = await mogoDB.getDB().collection(boardCollectionName).insertOne(values)

        return result;
    } catch (error) {
        throw new Error(error)
    }
}
const findOneById = async (id) => {
    try {
        const result = await mogoDB.getDB().collection(boardCollectionName).findOne({ _id: ObjectId(id) })
        return result
    } catch (err) {
        throw new Error(err)
    }
}
// 
const pushColumnOrder = async (boardId, columnId) => {
    try {
        const result = await mogoDB.getDB().collection(boardCollectionName).findOneAndUpdate(
            { _id: ObjectId(boardId) },
            { $push: { columnOrder: columnId } },
            { returnDocument: 'after' }
        );
        console.log('check result111:', result.value)
        return result.value;
    } catch (error) {
        throw new Error(error)
    }
}
const getFullboard = async (boardId) => {
    try {

        const result = await mogoDB.getDB().collection(boardCollectionName).aggregate([
            {
                $match: {
                    _id: ObjectId(boardId),
                    _destroy: false,
                },
            },
            {
                $lookup: {
                    from: columnModel.columnCollectionName,
                    localField: '_id',
                    foreignField: 'boardId',
                    as: 'columns'
                }
            },
            {
                $lookup: {
                    from: cardModel.cardCollectionName,
                    localField: '_id',
                    foreignField: 'boardId',
                    as: 'cards'
                }
            },
        ]).toArray()

        return result[0] || {};
    } catch (error) {
        throw new Error(error)
    }
}
const updateBoard = async (id, data) => {
    try {
        const updateData = {
            ...data
        }
        if (data.boardId) {
            updateData.boardId = ObjectId(data.boardId)
        }

        const result = await mogoDB.getDB().collection(boardCollectionName).findOneAndUpdate(
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
    createNewBoard,
    findOneById,
    pushColumnOrder,
    getFullboard,
    updateBoard
}