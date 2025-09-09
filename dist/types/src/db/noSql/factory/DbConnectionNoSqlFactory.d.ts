import { DbNoSqlOptions, IDbConnectionNoSql } from "../..";
export declare class DbConnectionNoSqlFactory {
    static getDynamicByDatabaseName({ databaseName, optionsDb, }: {
        databaseName: string;
        optionsDb?: Partial<DbNoSqlOptions>;
    }): Promise<IDbConnectionNoSql>;
}
