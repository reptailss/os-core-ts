import { ILoaderDbConnectionSqlConfigByDomain, ILoaderDbConnectionSqlConfigByLeId, ILoaderDbConnectionSqlConfigStatic } from "../../core";
export declare class LoaderDbConnectionSqlConfigStaticInMemory implements ILoaderDbConnectionSqlConfigStatic {
    getConfig(): {
        storage: string;
        dialect: 'sqlite';
        logging: boolean;
        cashedKey: string;
        hasKeepConnectionAlive: boolean;
    };
}
export declare class LoaderDbConnectionSqlConfigByLeIdInMemory implements ILoaderDbConnectionSqlConfigByLeId {
    getConfig(legalEntityId: number): Promise<{
        storage: string;
        dialect: 'sqlite';
        logging: boolean;
        cashedKey: string;
        hasKeepConnectionAlive: boolean;
    }>;
}
export declare class LoaderDbConnectionSqlConfigByByDomainInMemory implements ILoaderDbConnectionSqlConfigByDomain {
    getConfig(domain: string): Promise<{
        storage: string;
        dialect: 'sqlite';
        logging: boolean;
        cashedKey: string;
        hasKeepConnectionAlive: boolean;
    }>;
}
