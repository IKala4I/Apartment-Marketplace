import {apartmentRepository} from 'repositories';
import {Apartment} from 'interfaces';
import {validateApartment} from 'validation/apartment.validate';

class ApartmentService {
    async getList() {
        return apartmentRepository.find({}).lean();
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
}

export const apartmentService = new ApartmentService();