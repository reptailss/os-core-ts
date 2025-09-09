import { ModelSqlColumn, ModelSqlColumns, SettingsLoadModelSql } from "../../../model";
import { DataTypes, Model, ModelAttributeColumnOptions } from 'sequelize';
import { SqlIndexes } from "../../../model/core";
import { ModelIndexesOptions } from 'sequelize/types/model';
type TypeDescribeSequelizeColumn = 'INT' | 'DATETIME' | 'VARCHAR' | 'LONGTEXT' | 'FLOAT' | 'BIGINT' | 'JSON' | string;
type DescribeSequelizeColumn = {
    type: TypeDescribeSequelizeColumn;
    primaryKey?: boolean;
    allowNull?: boolean;
    autoIncrement?: boolean;
    defaultValue?: any;
};
type ColumnModelSequelize<T extends object = any, A extends object = any> = ModelAttributeColumnOptions<Model<T, A>>;
type ColumnsModelSequelize<T extends object = any, A extends object = any> = Record<string, ColumnModelSequelize<T, A>>;
export declare class DbConnectionModelSqlColumnsHelper {
    static transformBaseColumnToSequelize<Row extends object, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'>(columns: ModelSqlColumns<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>, options?: SettingsLoadModelSql<RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>): ColumnsModelSequelize<Row>;
    static getCurrentTypeColumnSequelize(column: ModelSqlColumn<any, any>): "DATETIME" | DataTypes.AbstractDataType;
    static columnBaseToSequelizeColumn<T extends object, A extends object = any>(column: ModelSqlColumn<any, any>): ColumnModelSequelize<T, A>;
    static transformDescribeSequelizeColumnToBase(column: DescribeSequelizeColumn): ModelSqlColumn<unknown, unknown>;
    static transformIndexesToSequelize(indexes?: SqlIndexes<any>): ModelIndexesOptions[];
    private static getTypeOptions;
    private static getColumnType;
}
export {};
