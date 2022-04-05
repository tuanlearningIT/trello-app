import express from "express";
import boardController from '../controllers/boardController';
import boardValidation from '../validations/boardValidation'
let router = express.Router()

let initBoardRoutes = (app) => {

    router.post('/create-new-board', boardValidation.createNewBoard, boardController.createNewBoard);
    router.get('/:id', boardController.getFullboard);
    router.put('/update/:id', boardValidation.updateBoard, boardController.updateBoard);


    return app.use('/board', router)
}

module.exports = initBoardRoutes;