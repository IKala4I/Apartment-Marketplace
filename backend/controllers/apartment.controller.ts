import {NextFunction, Request, Response} from 'express';
import {apartmentService} from 'services';

async function getList(req: Request, res: Response, next: NextFunction) {
    try {
        const apartments = await apartmentService.getList();

        res.status(200).json(apartments);
    } catch (error) {
        next(error);
    }
}

export {getList};