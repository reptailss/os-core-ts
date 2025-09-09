import { OrderParams, PermittedWhereOperator, WhereParams } from "../../../params";
import { FindAttributeOptions, Order, Sequelize, WhereOptions } from 'sequelize';
import { OrderWithSqlAggregate, SqlAggregate, SqlAssociation, SqlAssociationRow, SqlFilters } from "../../../model/core";
type Operators = {
    eq: symbol;
    ne: symbol;
    gte: symbol;
    gt: symbol;
    lte: symbol;
    lt: symbol;
    not: symbol;
    is: symbol;
    in: symbol;
    notIn: symbol;
    like: symbol;
    notLike: symbol;
    iLike: symbol;
    notILike: symbol;
    regexp: symbol;
    notRegexp: symbol;
    iRegexp: symbol;
    notIRegexp: symbol;
    between: symbol;
    notBetween: symbol;
    overlap: symbol;
    contains: symbol;
    contained: symbol;
    adjacent: symbol;
    strictLeft: symbol;
    strictRight: symbol;
    noExtendRight: symbol;
    noExtendLeft: symbol;
    and: symbol;
    or: symbol;
    any: symbol;
    all: symbol;
    values: symbol;
    col: symbol;
    placeholder: symbol;
    join: symbol;
    raw: symbol;
};
export type OperatorSequelize = Operators[keyof Operators];
type ValueWhereOpSequelizeParams<T> = Partial<Record<keyof Operators, T[keyof T]>>;
export type ValueSequelizeParams = number | string | number[] | string[];
export type WhereOpParamsSequelize<T> = {
    [K in keyof T]?: ValueWhereOpSequelizeParams<T>;
};
export type PermittedReplaceOperatorsSequelize = Record<PermittedWhereOperator, OperatorSequelize>;
export declare class DbConnectionSqlModelQueryBuilder<Row extends object, Includes extends Record<string, SqlAssociation<any>> = {}> {
    private readonly includes;
    private readonly dbConnection;
    constructor(dbConnection: Sequelize, includes?: Includes);
    buildAttributes({ attributes, aggregates, }: {
        attributes?: (string | keyof Row)[];
        aggregates?: Record<string, SqlAggregate<Row>>;
    }): FindAttributeOptions | undefined;
    buildWhere<Row extends object>({ where, filters, }: {
        where?: WhereParams<Row>;
        filters?: SqlFilters<Row>;
    }): WhereOptions;
    buildOrder<Aggregates extends Record<string, SqlAggregate<Row>> = {}>({ order, include, orderAggregate, }: {
        include?: Array<SqlAssociationRow<Includes>>;
        order?: OrderParams<any> | undefined;
        orderAggregate?: OrderWithSqlAggregate<Aggregates>;
    }): Order;
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
export {};
