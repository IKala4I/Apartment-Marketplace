import {apartmentRepository} from 'repositories';
import {Apartment} from 'interfaces';
import {validateApartment} from 'validation/apartment.validate';
import {Filters} from 'interfaces/filters.interface';
import {Query} from 'express-serve-static-core';
import {convertRequestQueryToGetApartments} from 'utils/helpers';
import {CollationOptions} from 'mongodb';

class ApartmentService {
    async getList(query: Query) {
        const {filters, sorting} = await convertRequestQueryToGetApartments(query);
        const collation: CollationOptions = {locale: 'en', caseLevel: false, strength: 1};

        const apartments = await apartmentRepository
            .find(filters)
            .collation(collation)
            .sort([[sorting.field, sorting.order]])
            .lean();

        if (Object.keys(filters).length) {
            const amount = await this.getAmount(filters);
            return [apartments, amount];
        }

        const amount = await this.getAmount({});

        return [apartments, amount];
    }

    async getOne(id: string) {
        return apartmentRepository.findById(id).lean();
    }

    async createApartment(payload: Apartment) {
        const data = await validateApartment(payload);

        return await apartmentRepository.createOne(data);
    }

    async updateApartment(id: string, payload: Apartment) {
        const data = await validateApartment(payload);

        return apartmentRepository.findByIdAndUpdate(id, data, {new: true}).lean();
    }

    async deleteApartment(id: string) {
        return apartmentRepository.deleteOne({_id: id}).lean();
    }

    private async getAmount(filters: Filters) {
        const apartments = await apartmentRepository.find(filters).lean();
        return apartments.length;
    }
}

export const apartmentService = new ApartmentService();