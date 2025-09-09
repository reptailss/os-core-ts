import { RowWithBaseFieldsModelNoSql } from "../../core";
export type NoSqlIndexes<Row extends object, RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'> = NoSqIndex<Row, RowDateAddKey, RowDateUpdateKey>[];
export type NoSqIndex<Row extends object, RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'> = {
    columns: ColumnNoSqlIndex<RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>;
    options?: {
        name?: string;
        unique?: boolean;
        sparse?: boolean;
        background?: boolean;
        expireAfterSeconds?: number;
    };
};
export type ColumnNoSqlIndex<T> = Record<keyof T | string, 1 | -1>;
