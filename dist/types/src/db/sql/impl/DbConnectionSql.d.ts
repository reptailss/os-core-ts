import { Sequelize } from 'sequelize';
import { DbConnectionSqlConfig, IDbConnectionSql, ISqlAssociationModel } from "../..";
import { EntityColumn } from "../../../entity";
export declare class DbConnectionSql implements IDbConnectionSql {
    cashedKey: string;
    sequelize: Sequelize;
    private associationModels;
    constructor(dbOptions: DbConnectionSqlConfig | {
        storage: string;
        dialect: 'sqlite';
        logging: boolean;
    });
    private getQueryInterface;
    query<T>(value: string, options: {
        replacements: Record<string, string | number>;
    }): Promise<T[]>;
    syncRepositories(): Promise<void>;
    close(): Promise<void>;
    tableExists(tableName: string): Promise<boolean>;
    getColumnsTable<Entity extends object>(tableName: string): Promise<Record<keyof Entity, EntityColumn>>;
    renameColumn(tableName: string, oldName: string, newName: string): Promise<void>;
    addColumn(tableName: string, columnName: string, column: EntityColumn): Promise<void>;
    removeColumn(tableName: string, columnName: string): Promise<void>;
    changeColumn(tableName: string, columnName: string, column: EntityColumn): Promise<void>;
    checkConnection(): Promise<void>;
    dropTable(tableName: string): Promise<void>;
    createTable<Entity extends object>(tableName: string, columns: Record<keyof Entity, EntityColumn>): Promise<void>;
    addModelForAssociation(tableName: string, associationModel: ISqlAssociationModel<any>): this;
    private addAssociations;
}
