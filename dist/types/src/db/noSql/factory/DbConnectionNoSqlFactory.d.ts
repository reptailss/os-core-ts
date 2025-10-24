import { IDbConnectionNoSql } from "../..";
export declare class DbConnectionNoSqlFactory {
    static getStaticByDatabaseName(databaseName: string): IDbConnectionNoSql;
}
