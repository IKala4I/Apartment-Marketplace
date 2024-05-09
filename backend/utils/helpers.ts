import {Query} from 'express-serve-static-core';
import {ApartmentQuery} from 'interfaces/apartment.interface';
import {APARTMENT_LIMIT} from 'constants/apartment.constant';

export async function convertRequestQueryToGetApartments(reqQuery: Query) {
    const query: ApartmentQuery = {
        filters: {},
        sorting: {},
        page: reqQuery.page ? parseInt(reqQuery.page as string) : 0,
        limit: reqQuery.limit ? parseInt(reqQuery.limit as string) : APARTMENT_LIMIT
    };

    if (reqQuery.rooms) {
        query.filters['rooms'] = reqQuery.rooms;
    }

    if (reqQuery.price && (reqQuery.price === 'asc' || reqQuery.price === 'desc')) {
        query.sorting['field'] = 'price';
        query.sorting['order'] = reqQuery.price;
    } else {
        query.sorting['field'] = 'name';
        query.sorting['order'] = 'asc';
    }

    return query;
}