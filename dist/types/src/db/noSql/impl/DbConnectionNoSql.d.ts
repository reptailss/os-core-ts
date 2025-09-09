import { ModelNoSqlColumns, IModelNoSql, NoSqlIndexes, SettingsLoadModelNoSql } from "../../../model";
import { DbNoSqlOptions, IDbConnectionNoSql } from "../..";
export declare class DbConnectionNoSql implements IDbConnectionNoSql {
    private dbConnectionMongoose;
    private databaseName;
    private optionsDb?;
    constructor(databaseName: string, optionsDb?: Partial<DbNoSqlOptions>);
    init(): Promise<void>;
    defineModel<Row extends object, RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'>({ columns, collectionName, options, indexes, }: {
        collectionName: string;
        columns: ModelNoSqlColumns<Row, RowDateAddKey, RowDateUpdateKey>;
        options?: SettingsLoadModelNoSql<RowDateAddKey, RowDateUpdateKey>;
        indexes?: NoSqlIndexes<Row, RowDateAddKey, RowDateUpdateKey>;
    }): IModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>;
}
