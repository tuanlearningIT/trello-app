import columnModel from '../models/columnModel';
import boardModel from '../models/boardModel';
import cardModel from '../models/cardModel';
let createNewColumn = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newColumn = await columnModel.createNewColumn(data)
            let getNewColumn = await columnModel.findOneById(newColumn.insertedId.toString())
            // getNewColumn.cards = []
            //update columnOrder Array in board collection 
            await boardModel.pushColumnOrder(getNewColumn.boardId.toString(), getNewColumn._id.toString())
            resolve(getNewColumn)
        } catch (error) {
            reject(error)
        }
    })
}
let updateColumn = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let updateData = {
                ...data,
                updatedAt: Date.now()
            }
            if (updateData._id) delete updateData._id;
            if (updateData.cards) delete updateData.cards;
            const result = await columnModel.updateColumn(id, updateData)

            if (result._destroy) {
                //delete many cards in this column
                cardModel.deleteMany(result.cardOrder)
            }
            resolve(result)
        } catch (error) {

            reject(error)
        }
    })
}

module.exports = {
    createNewColumn,
    updateColumn

}