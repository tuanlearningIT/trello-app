
import columnService from '../services/columnService';
let createNewColumn = async (req, res) => {
    try {
        let data = await columnService.createNewColumn(req.body)
        return res.status(200).json(data)

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: e.message,
        })
    }
}
let updateColumn = async (req, res) => {
    try {
        let data = await columnService.updateColumn(req.params.id, req.body)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: e.message,
        })
    }
}
module.exports = {
    createNewColumn,
    updateColumn

}