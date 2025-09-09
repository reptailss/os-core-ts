export declare class OsCoreLegalEntityService {
    static getIdByDomain(domain: string): Promise<number>;
    static getDomainById(legalEntityId: number): Promise<string>;
    static getDbConfigById(legalEntityId: number): Promise<{
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    }>;
    static getInfoById(legalEntityId: number): Promise<{
        name: string;
        typeId: number;
        ownerSociumUserId: number | null;
    }>;
    static getBmsSettingsById(legalEntityId: number): Promise<{
        logo: string | null;
    }>;
    private static getInfoLegalEntityRedisKey;
}
