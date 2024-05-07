import express from 'express';

import apartmentRouter from './apartment.routes'

const router = express.Router();

router.use('/apartments', apartmentRouter);

export default router;