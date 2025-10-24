import { SqlAssociation } from "../../../repository/core";
import { EntityColumn } from "../../../entity";
export interface ISqlAssociationModel<Row extends object> {
    _getRawModel(): any;
    hasOne(model: ISqlAssociationModel<object>, options: {
        foreignKey: string;
        as: string;
        onDelete?: 'RESTRICT' | 'SET_NULL' | 'CASCADE';
    }): this;
    hasMany(model: ISqlAssociationModel<object>, options: {
        foreignKey: string;
        as: string;
        onDelete?: 'RESTRICT' | 'SET_NULL' | 'CASCADE';
    }): this;
    belongsTo(model: ISqlAssociationModel<object>, options: {
        foreignKey: string;
        as: string;
    }): this;
    getIncludes(): Record<string, SqlAssociation<any>>;
}
export interface IDbConnectionSql {
    cashedKey: string;
    close(): Promise<void>;
    syncRepositories(): Promise<void>;
    checkConnection(): Promise<void>;
    query<Row extends object>(value: string, options?: {
        replacements?: Record<string, string | number | string[] | number[] | undefined>;
    }): Promise<Row[]>;
    tableExists(tableName: string): Promise<boolean>;
    getColumnsTable<Entity extends object>(tableName: string): Promise<Record<keyof Entity, EntityColumn>>;
    renameColumn(tableName: string, oldName: string, newName: string): Promise<void>;
    addColumn(tableName: string, columnName: string, column: EntityColumn): Promise<void>;
    changeColumn(tableName: string, columnName: string, column: EntityColumn): Promise<void>;
    removeColumn(tableName: string, columnName: string): Promise<void>;
    dropTable(tableName: string): Promise<void>;
    createTable<Entity extends object>(tableName: string, columns: Record<keyof Entity, EntityColumn>): Promise<void>;
    addModelForAssociation(tableName: string, associationModel: ISqlAssociationModel<any>): this;
    sequelize: any;
}
