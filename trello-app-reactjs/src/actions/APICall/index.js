
import axios from '../../axios';

const fecthBoardDetail = async (boardId) => {
    return await axios.get(`/board/${boardId}`)
}
const updateBoard = async (id, data) => {
    return await axios.put(`/board/update/${id}`, data)
}
const createNewColumn = async (data) => {
    return await axios.post(`/column/create-new-column`, data)
}
const updateColumnTitle = async (id, data) => {
    return await axios.put(`/column/update/${id}`, data)
}
const createNewCard = async (data) => {
    return await axios.post(`/card/create-new-card`, data)
}
const updateCard = async (id, data) => {
    return await axios.put(`/card/update/${id}`, data)
}


export {
    fecthBoardDetail,
    updateBoard,
    createNewColumn,
    updateColumnTitle,
    createNewCard,
    updateCard,


}