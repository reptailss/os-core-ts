import { DbSqlOptions, IDbConnectionSql } from "../..";
export declare class DbConnectionSqlHelper {
    static getTargetDynamicDbSqlOptions({ options, databaseName, }: {
        options?: Partial<DbSqlOptions>;
        databaseName: string;
    }): DbSqlOptions;
    static getTargetStaticDbSqlOptions(options?: Partial<DbSqlOptions>): DbSqlOptions;
    static keepConnectionAlive: (connection: IDbConnectionSql) => void;
}
