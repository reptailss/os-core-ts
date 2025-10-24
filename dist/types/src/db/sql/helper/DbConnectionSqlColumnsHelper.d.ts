import { EntityColumn } from "../../../entity";
import { SqlIndexes } from "../../../repository/core";
type TypeDescribeSequelizeColumn = 'INT' | 'DATETIME' | 'VARCHAR' | 'LONGTEXT' | 'FLOAT' | 'BIGINT' | 'JSON' | string;
type DescribeSequelizeColumn = {
    type: TypeDescribeSequelizeColumn;
    primaryKey?: boolean;
    allowNull?: boolean;
    autoIncrement?: boolean;
    defaultValue?: any;
};
type ColumnModelSequelize<T extends object = any, A extends object = any> = any;
type ColumnsModelSequelize<T extends object = any, A extends object = any> = Record<string, ColumnModelSequelize<T, A>>;
export declare class DbConnectionSqlColumnsHelper {
    static transformEntityColumnsToSequelize<ClassEntity extends object>(columns: Record<keyof ClassEntity, EntityColumn>, dialect: string, options?: {
        primaryKey?: string | null;
        dateAdd?: string | null;
        dateUpdate?: string | null;
    }): ColumnsModelSequelize<any>;
    static entityColumnToSequelizeColumn<T extends object, A extends object = any>(column: EntityColumn, dialect: string): ColumnModelSequelize<T, A>;
    static transformDescribeSequelizeColumnToEntity(column: DescribeSequelizeColumn): EntityColumn;
    static transformIndexesToSequelize(indexes?: SqlIndexes<any>): any[];
    private static getTypeOptions;
    private static getColumnType;
    private static getCurrentTypeColumnSequelize;
}
export {};
