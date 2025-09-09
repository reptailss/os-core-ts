import { DbNoSqlOptions } from "../../../db";
import { IModelNoSql, ModelNoSqlColumns, NoSqlIndexes, SettingsLoadModelNoSql } from "../..";
export declare class LoaderModelNoSql {
    static byDatabaseNameAndCollectionName<Row extends object, RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'>(props: {
        databaseName: string;
        columns: ModelNoSqlColumns<Row, RowDateAddKey, RowDateUpdateKey>;
        collectionName: string;
        optionsDb?: DbNoSqlOptions;
        options?: SettingsLoadModelNoSql<RowDateAddKey, RowDateUpdateKey>;
        indexes?: NoSqlIndexes<Row, RowDateAddKey, RowDateUpdateKey>;
    }): Promise<IModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>;
    static byDatabaseNameAndYearMonth<Row extends object, RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'>(props: {
        databaseName: string;
        columns: ModelNoSqlColumns<Row, RowDateAddKey, RowDateUpdateKey>;
        collectionName: string;
        year: number;
        month: number;
        optionsDb?: DbNoSqlOptions;
        options?: SettingsLoadModelNoSql<RowDateAddKey, RowDateUpdateKey>;
        indexes?: NoSqlIndexes<Row, RowDateAddKey, RowDateUpdateKey>;
    }): Promise<IModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>;
    static getModelKeysFromCache(): string[];
    static deleteModelFromCacheByDatabaseNameAndCollectionName(props: {
        databaseName: string;
        collectionName: string;
    }): void;
    private static getCollectionNameByYearMonth;
    private static formatNumber;
    private static buildKeyByYearMonth;
    private static buildCollectionKey;
}
