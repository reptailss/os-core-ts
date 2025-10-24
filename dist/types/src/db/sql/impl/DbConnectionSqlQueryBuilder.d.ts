import { OrderParams, WhereParams } from "../../../params";
import { Sequelize } from 'sequelize';
import { SqlAggregate, SqlAssociation, SqlAssociationRow, SqlOrderWithAggregate, WhereSql } from "../../../repository/core";
import { Entity } from "../../../entity";
export declare class DbConnectionSqlQueryBuilder<ClassEntity extends object, Includes extends Record<string, SqlAssociation<any>> = {}> {
    private readonly includes;
    private readonly dbConnection;
    constructor(dbConnection: Sequelize, includes?: Includes);
    buildAttributes(attributes?: (string | keyof ClassEntity)[], aggregates?: Record<string, SqlAggregate<Entity<ClassEntity>>>): any | undefined;
    buildWhere(where?: WhereSql<ClassEntity>, clientWhere?: WhereParams<Entity<ClassEntity>>): any;
    buildOrder<Aggregates extends Record<string, SqlAggregate<ClassEntity>> = {}>(order?: OrderParams<any> | undefined, include?: Array<SqlAssociationRow<Includes>>, orderAggregate?: SqlOrderWithAggregate<Aggregates>): any;
    getIncludes(incl?: Array<SqlAssociationRow<Includes>>): any[];
    getRawOption(incl?: Array<SqlAssociationRow<Includes>>): boolean;
    private parseWhereParamsToOpSequelize;
    private parseFiltersToOpSequelize;
    private getTargetOperator;
    private buildContainsFilterArray;
    private buildContainsFilter;
    private escapeValue;
    private getTargetValue;
}
