import { DbSqlOptions, IDbConnectionSql } from "../..";
export declare class DbConnectionSqlFactory {
    static getDynamicByDomain(props: {
        domain: string;
        optionsDb?: Partial<Omit<DbSqlOptions, 'dbDatabase'>>;
    }): Promise<IDbConnectionSql>;
    static getDynamicByDatabaseName(props: {
        databaseName: string;
        optionsDb?: Partial<Omit<DbSqlOptions, 'dbDatabase'>>;
    }): IDbConnectionSql;
    static getStatic(options?: Partial<DbSqlOptions>): IDbConnectionSql;
}
