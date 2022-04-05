import cardModel from '../models/cardModel';
import columnModel from '../models/columnModel'
let createNewCard = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newCard = await cardModel.createNewCard(data)
            console.log(newCard)
            let getNewCard = await cardModel.findOneById(newCard.insertedId.toString())
            await columnModel.pushCardOrder(getNewCard.columnId.toString(), getNewCard._id.toString())
            resolve(getNewCard)
        } catch (error) {
            reject(error)
        }
    })
}
let updateCard = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let updateData = {
                ...data,
                updatedAt: Date.now()
            }
            if (updateData._id) delete updateData._id;
            const result = await cardModel.updateCard(id, updateData)
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {

    createNewCard,
    updateCard

}