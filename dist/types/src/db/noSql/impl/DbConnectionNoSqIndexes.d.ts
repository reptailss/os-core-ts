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
import { NoSqlIndexes } from "../../../model";
import { Connection, Model } from 'mongoose';
type MongooseModel<T extends object> = Model<T>;
export declare class DbConnectionNoSqIndexes {
    initIndexesMongoose: <Row extends object, RowDateAddKey extends string = "date_add", RowDateUpdateKey extends string = "date_update">({ indexes, model, dbConnection, collectionName, }: {
        indexes?: NoSqlIndexes<Row, RowDateAddKey, RowDateUpdateKey> | undefined;
        model: MongooseModel<Row>;
        dbConnection: Connection;
        collectionName: string;
    }) => Promise<void>;
    private getKeyByColumns;
}
export {};
