import express from 'express';
import {ApartmentController} from 'controllers';

const router = express.Router();

router
    .route('/')
    .get(ApartmentController.getList)
    .post(ApartmentController.createApartment);

router
    .route('/:id')
    .get(ApartmentController.getOne)
    .put(ApartmentController.updateApartment)
    .delete(ApartmentController.deleteApartment);

export default router;