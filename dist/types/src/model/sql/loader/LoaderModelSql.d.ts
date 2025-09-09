import { IModelSql, IModelSqlDynamicRegistry, ModelSqlColumns, SettingsLoadModelSql } from "../..";
import { DbSqlOptions, IDbConnectionSql, ISqlMigrationTaskFactory } from "../../../db";
import { SqlAssociation, SqlIndexes } from "../../core";
export declare class LoaderModelSql {
    static dynamicByDatabaseName<Row extends object, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'>(props: {
        databaseName: string;
        columns: ModelSqlColumns<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>;
        options?: SettingsLoadModelSql<RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>;
        tableName: string;
        optionsDb?: Partial<Omit<DbSqlOptions, 'dbDatabase'>>;
        migrationTaskFactory?: ISqlMigrationTaskFactory;
        dynamicModelRegistry?: IModelSqlDynamicRegistry<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>;
        indexes?: SqlIndexes<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>;
    }): Promise<IModelSql<Row, {}, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>;
    static dynamicByDomain<Row extends object, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'>(props: {
        domain: string;
        columns: ModelSqlColumns<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>;
        options?: SettingsLoadModelSql<RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>;
        tableName: string;
        optionsDb?: Partial<Omit<DbSqlOptions, 'dbDatabase'>>;
        migrationTaskFactory?: ISqlMigrationTaskFactory;
        dynamicModelRegistry?: IModelSqlDynamicRegistry<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>;
        indexes?: SqlIndexes<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>;
    }): Promise<IModelSql<Row, {}, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>;
    static dynamicDbConfigByLegalEntityId<Row extends object, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'>(props: {
        legalEntityId: number;
        columns: ModelSqlColumns<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>;
        options?: SettingsLoadModelSql<RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>;
        tableName: string;
        optionsDb?: Partial<Omit<DbSqlOptions, 'dbDatabase' | 'dbUsername' | 'dbPassword' | 'host'>>;
        migrationTaskFactory?: ISqlMigrationTaskFactory;
        dynamicModelRegistry?: IModelSqlDynamicRegistry<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>;
        indexes?: SqlIndexes<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>;
    }): Promise<IModelSql<Row, {}, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>;
    static staticByDbConnection<Row extends object, Includes extends Record<string, SqlAssociation<any>> = {}, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'>(props: {
        columns: ModelSqlColumns<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>;
        options?: SettingsLoadModelSql<RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>;
        tableName: string;
        dbConnection: IDbConnectionSql;
        includes?: Includes;
        indexes?: SqlIndexes<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>;
    }): IModelSql<Row, Includes, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>;
}
