import express from "express";
import columnController from '../controllers/columnController';
import columnValidation from '../validations/columnValidation'
let router = express.Router()

let initColumnRoutes = (app) => {

    router.post('/create-new-column', columnValidation.createNewColumn, columnController.createNewColumn);
    router.put('/update/:id', columnValidation.updateColumn, columnController.updateColumn);


    return app.use('/column', router)
}

module.exports = initColumnRoutes;