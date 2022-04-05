import express from "express";
import cardController from '../controllers/cardController';
import cardValidation from '../validations/cardValidation'
let router = express.Router()

let initCardRoutes = (app) => {

    router.post('/create-new-card', cardValidation.createNewCard, cardController.createNewCard);
    router.put('/update/:id', cardValidation.updateCard, cardController.updateCard);

    return app.use('/card', router)
}

module.exports = initCardRoutes