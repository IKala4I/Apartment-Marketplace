import express from 'express';
import {ApartmentController} from 'controllers';

const router = express.Router();

router
    .route('/')
    .get(ApartmentController.getList);

export default router;