import { NoSqlFilters, NoSqlPaginationSettings, PaginationNoSqlProps, RowWithBaseFieldsAndAttributesModelNoSql, RowWithBaseFieldsModelNoSql } from "../../core";
import { IModelNoSql, SettingsLoadModelNoSql } from "../..";
import { PaginationQueryParams, PaginationValues } from "../../../pagination";
export declare class ModelNoSqlPagination {
    static byYearAndMoth<Row extends object, RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update', ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>> | undefined = undefined>({ dateStart, dateEnd, getModelCb, params, filters, options, attributes, settings, }: {
        dateStart: Date;
        dateEnd: Date;
        getModelCb: (props: {
            year: number;
            month: number;
        }) => Promise<IModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>;
        params: PaginationQueryParams<RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>;
        filters?: NoSqlFilters<RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>;
        options?: SettingsLoadModelNoSql<RowDateAddKey, RowDateUpdateKey>;
        attributes?: ReturnAttributes;
        settings?: NoSqlPaginationSettings<Row, RowDateAddKey, RowDateUpdateKey>;
    }): Promise<PaginationValues<RowWithBaseFieldsAndAttributesModelNoSql<Row, RowDateAddKey, RowDateUpdateKey, ReturnAttributes>>>;
    static byCollectionNames<Row extends object, RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update', ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>> | undefined = undefined>({ getModelCb, params, collectionNames, filters, attributes, }: PaginationNoSqlProps<Row, RowDateAddKey, RowDateUpdateKey, ReturnAttributes>): Promise<PaginationValues<RowWithBaseFieldsAndAttributesModelNoSql<Row, RowDateAddKey, RowDateUpdateKey, ReturnAttributes>>>;
}
