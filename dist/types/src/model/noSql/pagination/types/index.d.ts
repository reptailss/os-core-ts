import { IModelNoSql } from "../../..";
import { NoSqlFilters, RowWithBaseFieldsModelNoSql } from "../../../core";
import { PaginationQueryParams } from "../../../../pagination";
export type GetModelCbPaginationNoSql<Row extends object, RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'> = (collectionName: string) => Promise<IModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>;
export interface PaginationNoSqlProps<Row extends object, RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update', ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>> | undefined = undefined> {
    getModelCb: GetModelCbPaginationNoSql<Row, RowDateAddKey, RowDateUpdateKey>;
    collectionNames: string[];
    params: PaginationQueryParams<RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>;
    filters?: NoSqlFilters<RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>;
    attributes?: ReturnAttributes;
}
export type NoSqlPaginationSettings<Row extends object, RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'> = {
    dateFilterKey?: keyof RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>;
};
