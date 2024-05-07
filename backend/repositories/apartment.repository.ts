import BaseRepository from 'repositories/base.repository';
import {Apartments} from 'models';
import {Apartment} from 'interfaces';

export default class ApartmentRepository extends BaseRepository<Apartment> {
    constructor() {
        super(Apartments);
    }
}