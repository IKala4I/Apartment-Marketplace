import {apartmentRepository} from 'repositories';

class ApartmentService {
    async getList() {
        return apartmentRepository.find({}).lean();
    }

    async getOne(id: string) {
        return apartmentRepository.findById(id).lean();
    }
}

export const apartmentService = new ApartmentService();