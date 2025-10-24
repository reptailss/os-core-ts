import { IDbConnectionNoSql } from "../..";
export declare class DbConnectionNoSqlCashManager {
    static saveToCash(key: string, connection: IDbConnectionNoSql): void;
    static getFromCash(key: string): IDbConnectionNoSql | null;
    static deleteFromCash(key: string): void;
    static getAllFromCash(): Record<string, IDbConnectionNoSql>;
}
