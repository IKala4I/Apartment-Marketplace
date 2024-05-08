import {Apartment} from 'interfaces';
import Joi from 'joi';
import {badRequest} from 'utils/error';

export async function validateApartment(payload: Apartment) {
    const schema = Joi.object<Apartment>({
        rooms: Joi.number().min(1).required(),
        price: Joi.number().min(1).required(),
        name: Joi.string().min(1).max(98).required(),
        description: Joi.string().max(98).required()
    });

    try {
        return await schema.validateAsync(payload);
    } catch (error) {
        const errorMessage = error.message.replaceAll('"', '');
        throw badRequest(errorMessage, 'validation_failed');
    }
}