import boardModel from '../models/boardModel';
import _ from 'lodash'
let createNewBoard = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await boardModel.createNewBoard(data)
            let getNewColumn = await boardModel.findOneById(result.insertedId.toString())
            resolve(getNewColumn)
        } catch (error) {
            reject(error)
        }
    })
}
let getFullboard = (boardId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const board = await boardModel.getFullboard(boardId)
            if (!board) {
                throw new Error('Board not found!')
            }
            const tranformBoard = _.cloneDeep(board)
            //filter delete columns
            tranformBoard.columns = tranformBoard.columns.filter(column => !column._destroy)
            // add cards to each columns
            tranformBoard.columns.forEach(column => {
                column.cards = tranformBoard.cards.filter(c => c.columnId.toString() === column._id.toString())
            })
            //sort columns by columnOrder, sort cards bt cardOrder, this step  will pass  to front-end DEV
            // remove cards data from boards

            delete tranformBoard.cards;
            resolve(tranformBoard)
        } catch (error) {
            reject(error)
        }
    })
}
let updateBoard = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let updateData = {
                ...data,
                updatedAt: Date.now()
            }

            if (updateData._id) delete updateData._id;
            if (updateData.columns) delete updateData.columns;
            let result = await boardModel.updateBoard(id, updateData)

            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewBoard,
    getFullboard,
    updateBoard

}