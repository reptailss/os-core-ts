export declare class OsCoreLegalEntityService {
    static getIdByDomain(domain: string): Promise<number>;
    static getDbConfigById(legalEntityId: number): Promise<{
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    }>;
    private static getInfoLegalEntityRedisKey;
}
