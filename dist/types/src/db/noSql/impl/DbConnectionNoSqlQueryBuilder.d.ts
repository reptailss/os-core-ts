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
import { OrderParams, PermittedWhereOperator, WhereParams } from "../../../params";
import { RootFilterQuery } from 'mongoose';
import { Entity } from "../../../entity";
import { WhereNoSql } from "../../../repository/core";
type OperatorMongoose = string;
type OrderParamsMongoose<T> = [keyof T, 1 | -1][];
export type PermittedReplaceOperatorsMongoose = Record<PermittedWhereOperator, OperatorMongoose>;
export declare class DbConnectionNoSqlQueryBuilder {
    buildWhere<ClassEntity extends object>(where?: WhereNoSql<ClassEntity>, clientWhere?: WhereParams<Entity<ClassEntity>>): RootFilterQuery<any>;
    buildOrders: <T extends Record<keyof T, unknown>>(orders?: OrderParams<T>) => OrderParamsMongoose<T>;
    private parseWhereParamsToOpMongoose;
    private getTargetOperator;
    private getTargetValue;
}
export {};
