type PtpGroup = {
    api_access_keys: string;
    api_secret_key: string;
    open_user_id: number;
    name: string;
    description: string;
    city_id: number;
    active: 0 | 1;
    hide: 0 | 1;
    id: number;
    domain: string;
};
export declare class OsCorePtpCoreGroupsService {
    static getGroupByApiKeys({ apiAccessKey, apiSecretKey, }: {
        apiAccessKey: string;
        apiSecretKey: string;
    }): Promise<PtpGroup | null>;
    static saveGroupToRedis(ptpGroup: PtpGroup): Promise<void>;
    static deleteGroupFromRedis({ apiAccessKey, apiSecretKey, }: {
        apiAccessKey: string;
        apiSecretKey: string;
    }): Promise<void>;
    private static getGroupByApiKeysFromRedis;
    private static getGroupByApiKeysFromApi;
    private static buildGroupRedisKey;
}
export {};
