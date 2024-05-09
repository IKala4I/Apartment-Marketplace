import {Schema, model} from 'mongoose';

const ApartmentSchema = new Schema({
        rooms: {
            type: Number,
            min: 1,
            required: true
        },
        name: {
            type: String,
            trim: true,
            min: 1,
            max: 98,
            required: true
        },
        price: {
            type: Number,
            min: 1,
            required: true
        },
        description: {
            type: String,
            trim: true,
            min: 1,
            max: 998,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Apartments = model('apartments', ApartmentSchema);