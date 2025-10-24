import { INoSqlRepository } from "../..";
export declare class NoSqlRepositoriesCashManager {
    static getRepositoryKeysFromCache(): string[];
    static deleteRepositoryFromCacheByDatabaseNameAndCollectionName(props: {
        databaseName: string;
        collectionName: string;
    }): void;
    static saveToCash(key: string, repository: INoSqlRepository<any>): void;
    static getFromCash(key: string): INoSqlRepository<any> | null;
}
