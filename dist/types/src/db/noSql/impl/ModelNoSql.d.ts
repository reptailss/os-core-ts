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
import { DbNoSqlOptions } from "../..";
import { IModelNoSql, ModelNoSqlColumns, NoSqlIndexes, SettingsLoadModelNoSql } from "../../../model";
import { ConfigModelNoSql, CreateAttrRowModelNoSql, FindOptionUpdateRowModelNoSql, PropsCountModelNoSql, PropsDeleteManyRowsModelNoSql, PropsDeleteRowModelNoSql, PropsFindAllModelNoSql, PropsFindByPkModelNoSql, PropsFindOneModelNoSql, ResultFindAllModelNoSql, ResultFindByPkModelNoSql, ResultFindOneModelNoSql, RowWithBaseFieldsModelNoSql } from "../../../model/core";
import { Connection } from 'mongoose';
export declare class ModelNoSql<Row extends object, RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'> implements IModelNoSql<Row, RowDateAddKey, RowDateUpdateKey> {
    private readonly dbConnectionNoSqlFiltersBuilder;
    private readonly dbConnectionNoSqIndexes;
    private readonly dbConnection;
    private readonly model;
    private readonly collectionName;
    private readonly indexes?;
    private readonly databaseName;
    private readonly optionsDb?;
    constructor({ dbConnection, columns, collectionName, options, optionsDb, databaseName, indexes, }: {
        dbConnection: Connection;
        collectionName: string;
        columns: ModelNoSqlColumns<Row, RowDateAddKey, RowDateUpdateKey>;
        indexes?: NoSqlIndexes<Row, RowDateAddKey, RowDateUpdateKey>;
        options?: SettingsLoadModelNoSql<RowDateAddKey, RowDateUpdateKey>;
        databaseName: string;
        optionsDb?: Partial<DbNoSqlOptions>;
    });
    syncIndexes(): Promise<void>;
    create(row: CreateAttrRowModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>): Promise<RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>;
    createMany(rows: CreateAttrRowModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>[]): Promise<number>;
    update(row: Partial<Row>, options: FindOptionUpdateRowModelNoSql<Row, RowDateAddKey, RowDateUpdateKey, true>): Promise<RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>;
    update(row: Partial<Row>, options: FindOptionUpdateRowModelNoSql<Row, RowDateAddKey, RowDateUpdateKey, false>): Promise<void>;
    destroy(props: PropsDeleteRowModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>): Promise<number>;
    destroyMany(props: PropsDeleteManyRowsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>): Promise<number>;
    findAll<ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>> | undefined = undefined>(option?: PropsFindAllModelNoSql<Row, RowDateAddKey, RowDateUpdateKey, ReturnAttributes>): Promise<ResultFindAllModelNoSql<Row, RowDateAddKey, RowDateUpdateKey, ReturnAttributes>>;
    count(option?: PropsCountModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>): Promise<number>;
    findOne<ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>> | undefined = undefined>(option: PropsFindOneModelNoSql<Row, RowDateAddKey, RowDateUpdateKey, ReturnAttributes>): Promise<ResultFindOneModelNoSql<Row, RowDateAddKey, RowDateUpdateKey, ReturnAttributes>>;
    findByPk<ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>> | undefined = undefined>(key: string | number, option?: PropsFindByPkModelNoSql<Row, RowDateAddKey, RowDateUpdateKey, ReturnAttributes>): Promise<ResultFindByPkModelNoSql<Row, RowDateAddKey, RowDateUpdateKey, ReturnAttributes>>;
    dropCollection(): Promise<void>;
    getConfig(): ConfigModelNoSql;
}
