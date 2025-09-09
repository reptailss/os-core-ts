import { RowWithBaseFieldsModelSql } from "../../core";
export type SqlIndexes<Row extends object, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'> = SqIndex<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>[];
export type SqIndex<Row extends object, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'> = {
    columns: ColumnSqlIndex<RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>;
    options?: {
        name?: string;
        unique?: boolean;
        using?: 'BTREE' | 'HASH';
    };
};
export type ColumnSqlIndex<T> = Record<keyof T | string, {
    order?: 'ASC' | 'DESC';
    length?: number;
}>;
