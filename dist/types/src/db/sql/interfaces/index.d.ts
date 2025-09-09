import { ModelSqlColumn, ModelSqlColumns, IModelSql, SettingsLoadModelSql } from "../../../model";
import { SqlAssociation, SqlIndexes } from "../../../model/core";
export interface IDbConnectionSql {
    defineModel<Row extends object, Includes extends Record<string, SqlAssociation<any>> = {}, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'>(tableName: string, columns: ModelSqlColumns<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>, options?: SettingsLoadModelSql<RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>, includes?: Includes, indexes?: SqlIndexes<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>): IModelSql<Row, Includes, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>;
    close(): Promise<void>;
    syncModels(): Promise<void>;
    checkConnection(): Promise<void>;
    query<Row extends object>(value: string, options?: {
        replacements?: Record<string, string | number | string[] | number[] | undefined>;
    }): Promise<Row[]>;
    tableExists(tableName: string): Promise<boolean>;
    getColumnsTable<Row extends object>(tableName: string): Promise<ModelSqlColumns<Row>>;
    renameColumn(tableName: string, oldName: string, newName: string): Promise<void>;
    addColumn(tableName: string, columnName: string, column: ModelSqlColumn<any, any>): Promise<void>;
    changeColumn(tableName: string, columnName: string, column: ModelSqlColumn<any, any>): Promise<void>;
    removeColumn(tableName: string, columnName: string): Promise<void>;
    dropTable(tableName: string): Promise<void>;
    createTable<Row extends object>(tableName: string, columns: ModelSqlColumns<Row>): Promise<void>;
}
