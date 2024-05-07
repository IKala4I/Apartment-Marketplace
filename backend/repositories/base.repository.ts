import {CreateOptions, FilterQuery, Model, QueryOptions, Types, UpdateQuery} from 'mongoose';

export abstract class BaseRepository<T> {
    protected constructor(private model: Model<T>) {}

    distinct(field: string, filter?: FilterQuery<T>) {
        return this.model.distinct(field, filter);
    }

    aggregate(pipeline: any[], options?: object) {
        return this.model.aggregate(pipeline, options);
    }

    createOne(doc: T) {
        return this.model.create(doc);
    }

    createMany(docs: T[], options?: CreateOptions) {
        return this.model.create(docs, options);
    }

    insertMany(docs: T | T[], options?: NonNullable<unknown>) {
        return this.model.insertMany(docs, options);
    }

    find(
        filter: FilterQuery<T>,
        projection?: NonNullable<unknown> | string | string[],
        options?: NonNullable<unknown>
    ) {
        return this.model.find(filter, projection, options);
    }

    findOne(conditions: FilterQuery<T>, projection?: object | string | string[], options?: object) {
        return this.model.findOne(conditions, projection, options);
    }

    findById(id: any, projection?: object | string | string[], options?: object) {
        return this.model.findById(id, projection, options);
    }

    updateOne(filter: FilterQuery<T>, update: UpdateQuery<T> | object[], options?: object) {
        return this.model.updateOne(filter, update, options);
    }

    updateMany(filter: FilterQuery<T>, update: UpdateQuery<T> | object[], options?: object) {
        return this.model.updateMany(filter, update, options);
    }

    deleteOne(filter: FilterQuery<T>, update?: object) {
        return this.model.deleteOne(filter, update);
    }

    deleteMany(conditions: FilterQuery<T>, options?: object) {
        return this.model.deleteMany(conditions, options);
    }

    findByIdAndUpdate(id: Types.ObjectId | string, update: Partial<T>, options?: QueryOptions) {
        return this.model.findByIdAndUpdate(id, update, options);
    }
}

export default BaseRepository;
