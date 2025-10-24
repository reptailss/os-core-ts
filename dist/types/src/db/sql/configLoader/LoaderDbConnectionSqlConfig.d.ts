import { DbConnectionSqlConfig } from "../..";
import { ILoaderDbConnectionSqlConfigByDomain, ILoaderDbConnectionSqlConfigByLeId, ILoaderDbConnectionSqlConfigStatic } from "../../core";
export declare class LoaderDbConnectionSqlConfigStatic implements ILoaderDbConnectionSqlConfigStatic {
    getConfig(): DbConnectionSqlConfig | {
        storage: string;
        dialect: 'sqlite';
        logging: boolean;
        cashedKey: string;
        hasKeepConnectionAlive: boolean;
    };
}
export declare class LoaderDbConnectionSqlConfigByLeId implements ILoaderDbConnectionSqlConfigByLeId {
    getConfig(legalEntityId: number): Promise<DbConnectionSqlConfig | {
        storage: string;
        dialect: 'sqlite';
        logging: boolean;
        cashedKey: string;
        hasKeepConnectionAlive: boolean;
    }>;
}
export declare class LoaderDbConnectionSqlConfigByDomain implements ILoaderDbConnectionSqlConfigByDomain {
    getConfig(domain: string): Promise<DbConnectionSqlConfig | {
        storage: string;
        dialect: 'sqlite';
        logging: boolean;
        cashedKey: string;
        hasKeepConnectionAlive: boolean;
    }>;
}
