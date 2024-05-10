export interface Apartment {
    rooms: number;
    name: string;
    price: number;
    description: string;
}

export interface ApartmentQuery{
    filters: {[key: string]: any};
    sorting: {[key: string]: any};
}