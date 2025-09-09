import { KeysRowBaseFieldsModelNoSql, ModelNoSqlColumnDateTime, ModelNoSqlColumnInteger, ModelNoSqlColumnObject, ModelNoSqlColumnString } from "../../core";
export type ModelNoSqlColumn<Row, Value> = ModelNoSqlColumnInteger | ModelNoSqlColumnString | ModelNoSqlColumnObject<Value> | ModelNoSqlColumnDateTime;
export type ModelNoSqlColumns<Row extends object, RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'> = {
    [K in keyof Omit<Row, KeysRowBaseFieldsModelNoSql<RowDateAddKey, RowDateUpdateKey>>]: ModelNoSqlColumn<Row, Row[K]>;
};
