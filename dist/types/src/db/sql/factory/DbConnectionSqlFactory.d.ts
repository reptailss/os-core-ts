import { IDbConnectionSql } from "../..";
export declare class DbConnectionSqlFactory {
    static getDynamicByLeId(legalEntityId: number): Promise<IDbConnectionSql>;
    static getDynamicByDomain(domain: string): Promise<IDbConnectionSql>;
    static getStatic(): IDbConnectionSql;
    static getForCheckReadiness(): IDbConnectionSql;
}
