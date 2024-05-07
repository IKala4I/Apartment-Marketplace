import {Schema, model} from 'mongoose';

const ApartmentSchema = new Schema({
    rooms: {type: Number, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true}
});

export const Apartments = model('apartments', ApartmentSchema);