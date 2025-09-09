import { ModelSqlColumnBigint, ModelSqlColumnBoolean, ModelSqlColumnDateTime, ModelSqlColumnFloat, ModelSqlColumnInteger, ModelSqlColumnJson, ModelSqlColumnString, ModelSqlColumnText } from "../..";
import { KeysRowBaseFieldsModelSql } from "../../core";
export type ModelSqlColumn<Row, Value> = ModelSqlColumnInteger | ModelSqlColumnBigint | ModelSqlColumnFloat | ModelSqlColumnBoolean | ModelSqlColumnString | ModelSqlColumnJson<Value> | ModelSqlColumnText | ModelSqlColumnDateTime;
export type ModelSqlColumns<Row extends object, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'> = {
    [K in keyof Omit<Row, KeysRowBaseFieldsModelSql<RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>]: ModelSqlColumn<Row, Row[K]>;
};
