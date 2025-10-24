import { IDbConnectionSql } from "../..";
export declare class DbConnectionSqlCashManager {
    static saveToCash(key: string, connection: IDbConnectionSql): void;
    static getFromCash(key: string): IDbConnectionSql | null;
    static deleteFromCash(key: string): void;
    static getAllFromCash(): Record<string, IDbConnectionSql>;
}
