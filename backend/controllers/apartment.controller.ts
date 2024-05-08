import {NextFunction, Request, Response} from 'express';
import {apartmentService} from 'services';
import {Apartment} from 'interfaces';

async function getList(req: Request, res: Response, next: NextFunction) {
    try {
        const apartments = await apartmentService.getList();

        res.status(200).json(apartments);
    } catch (error) {
        next(error);
    }
}

async function getOne(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const {id} = req.params;

    try {
        const apartment = await apartmentService.getOne(id);

        res.status(200).json(apartment);
    } catch (error) {
        next(error);
    }
}

async function createApartment(req: Request<unknown, unknown, Apartment>, res: Response, next: NextFunction) {
    try {
        const apartment = await apartmentService.createApartment(req.body);

        res.status(201).json(apartment);
    } catch (error) {
        next(error);
    }
}

async function updateApartment(req: Request<{ id: string }, unknown, Apartment>, res: Response, next: NextFunction) {
    try {
        const {id} = req.params;

        const updatedApartment = await apartmentService.updateApartment(id, req.body);

        res.status(200).json(updatedApartment);
    } catch (error) {
        next(error);
    }
}

async function deleteApartment(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const {id} = req.params;

        const deletedApartment = await apartmentService.deleteApartment(id);

        res.status(200).json(deletedApartment);
    } catch (error) {
        next(error);
    }
}

export {getList, getOne, createApartment, updateApartment, deleteApartment};