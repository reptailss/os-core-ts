/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Connection, Model } from 'mongoose';
import { NoSqlIndexes } from "../../../repository/core";
import { Entity } from "../../../entity";
type MongooseModel<T extends object> = Model<T>;
export declare class DbConnectionNoSqIndexes<ClassEntity extends object> {
    private readonly entity;
    constructor(entity: ClassEntity);
    initIndexesMongoose({ indexes, model, dbConnection, collectionName, }: {
        indexes: NoSqlIndexes<ClassEntity>;
        model: MongooseModel<Entity<ClassEntity>>;
        dbConnection: Connection;
        collectionName: string;
    }): Promise<void>;
    private getKeyByColumns;
}
export {};
