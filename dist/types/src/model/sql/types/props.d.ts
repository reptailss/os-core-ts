import { OrderParams, WhereParams } from "../../../params";
import { SqlAggregate, SqlAssociation, SqlAssociationRow, SqlFilters, OrderWithSqlAggregate, RowWithAggregatesModelSql, RowWithIncludeModelSql } from "../../core";
export type RowWithBaseFieldsModelSql<Row, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'> = Row & RowBaseFieldsModelSql<RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>;
export type RowBaseFieldsModelSql<RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'> = Record<RowPrimaryKey, number> & (RowDateAddKey extends string ? Record<RowDateAddKey, Date> : {}) & (RowDateUpdateKey extends string ? Record<RowDateUpdateKey, Date> : {});
export type RowWithBaseFieldsAndAttributesModelSql<Row extends object, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update', ReturnAttributes extends Array<keyof RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>> | undefined = undefined> = ReturnAttributes extends Array<keyof RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>> ? Pick<RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>, ReturnAttributes[number]> : RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>;
export type KeysRowBaseFieldsModelSql<RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'> = keyof RowBaseFieldsModelSql<RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>;
export type CreateAttrRowModelSql<Row extends object, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'> = Omit<Row, KeysRowBaseFieldsModelSql<RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>;
export type PropsDeleteRowModelSql<Row extends object, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'> = {
    where?: WhereParams<RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>;
    filters?: SqlFilters<RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>;
};
export type PropsCountModelSql<Row extends object, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update', Includes extends Record<string, SqlAssociation<any>> = {}, Incl extends Array<SqlAssociationRow<Includes>> = []> = {
    where?: WhereParams<RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>;
    filters?: SqlFilters<RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>;
    include?: Incl;
    group?: Array<keyof Row>;
};
export type ConfigModelSql = {
    database: string;
    host: string;
    port: string;
    dbType: 'mysql';
    tableName: string;
};
export type FindOptionUpdateRowModelSql<Row extends object, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update', HasReturning extends (boolean | undefined) = boolean> = {
    where?: WhereParams<RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>;
    filters?: SqlFilters<RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>;
    returning?: HasReturning;
};
export type FindOptionUpdateManyRowModelSql<Row extends object, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update', HasReturning extends boolean = boolean> = {
    where?: WhereParams<RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>;
    filters?: SqlFilters<RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>;
    returning?: HasReturning;
};
export type PropsFindOneModelSql<Row extends object, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update', ReturnAttributes extends Array<keyof RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>> | undefined = undefined, Aggregates extends Record<string, SqlAggregate<Row>> = {}> = {
    where?: WhereParams<RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>;
    filters?: SqlFilters<RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>;
    attributes?: ReturnAttributes;
    aggregates?: Aggregates;
};
export type ResultFindOneModelSql<Row extends object, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update', ReturnAttributes extends Array<keyof RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>> | undefined = undefined, Aggregates extends Record<string, SqlAggregate<Row>> = {}> = RowWithAggregatesModelSql<RowWithBaseFieldsAndAttributesModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey, ReturnAttributes>, Aggregates> | null;
export type PropsFindByPkModelSql<Row extends object, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update', ReturnAttributes extends Array<keyof RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>> | undefined = undefined> = {
    attributes?: ReturnAttributes;
};
export type ResultFindByPkModelSql<Row extends object, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update', ReturnAttributes extends Array<keyof RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>> | undefined = undefined> = RowWithBaseFieldsAndAttributesModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey, ReturnAttributes> | null;
export type PropsFindAllModelSql<Row extends object, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update', ReturnAttributes extends Array<keyof RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>> | undefined = undefined, Includes extends Record<string, SqlAssociation<any>> = {}, Incl extends Array<SqlAssociationRow<Includes>> = [], Aggregates extends Record<string, SqlAggregate<Row>> = {}> = {
    where?: WhereParams<RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>;
    filters?: SqlFilters<RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>;
    order?: OrderParams<RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>;
    orderAggregate?: OrderWithSqlAggregate<Aggregates>;
    offset?: number;
    limit?: number;
    attributes?: ReturnAttributes;
    include?: Incl;
    aggregates?: Aggregates;
    group?: Array<keyof Row>;
};
export type ResultFindAllModelSql<Row extends object, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update', ReturnAttributes extends Array<keyof RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>> | undefined = undefined, Includes extends Record<string, SqlAssociation<any>> = {}, Incl extends Array<SqlAssociationRow<Includes>> = [], Aggregates extends Record<string, SqlAggregate<Row>> = {}> = RowWithAggregatesModelSql<RowWithIncludeModelSql<RowWithBaseFieldsAndAttributesModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey, ReturnAttributes>, Pick<Includes, Incl[number]['modelKey']>>, Aggregates>[];
export type OptionsPaginationModelSql<Row extends object, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update', ReturnAttributes extends Array<keyof RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>> | undefined = undefined, Includes extends Record<string, SqlAssociation<any>> = {}, Incl extends Array<SqlAssociationRow<Includes>> = [], Aggregates extends Record<string, SqlAggregate<Row>> = {}> = {
    attributes?: ReturnAttributes;
    filters?: SqlFilters<RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>;
    include?: Incl;
    aggregates?: Aggregates;
    group?: Array<keyof Row>;
    orderAggregate?: OrderWithSqlAggregate<Aggregates>;
};
