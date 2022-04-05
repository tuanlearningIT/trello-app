
import cardService from '../services/cardService';
let createNewCard = async (req, res) => {
    try {
        let data = await cardService.createNewCard(req.body)
        return res.status(200).json(data)

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: e.message,
        })
    }
}
let updateCard = async (req, res) => {
    try {
        let data = await cardService.updateCard(req.params.id, req.body)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: e.message,
        })
    }
}
module.exports = {
    createNewCard,
    updateCard

}