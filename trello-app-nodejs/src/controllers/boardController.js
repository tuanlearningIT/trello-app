import boardService from '../services/boardService';
let createNewBoard = async (req, res) => {
    try {
        let data = await boardService.createNewBoard(req.body)
        return res.status(200).json(data)

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: e.message,
        })
    }
}
let getFullboard = async (req, res) => {
    try {
        let data = await boardService.getFullboard(req.params.id)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: e.message,
        })
    }
}
let updateBoard = async (req, res) => {
    try {
        let data = await boardService.updateBoard(req.params.id, req.body)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: e.message,
        })
    }
}
module.exports = {
    createNewBoard,
    getFullboard,
    updateBoard,


}