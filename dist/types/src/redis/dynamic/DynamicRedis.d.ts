import Redis from 'ioredis';
export declare class RedisDynamicService {
    static deleteValue(key: string): Promise<number>;
    static getValue(key: string): Promise<string | null>;
    static setValue(key: string, value: string): Promise<void>;
    static getMapValue(key: string): Promise<Record<string, string> | {}>;
    static setMapValue(key: string, value: Record<string, string>): Promise<void>;
    static getMapValueByFieldKey(key: string, fieldKey: string): Promise<string | null>;
    static deleteMapValue(key: string, fieldKey: string): Promise<number>;
    static getClient(): Promise<Redis>;
    static checkConnection(): Promise<boolean>;
    private static getRedisDynamicClient;
    private static getNewRedisClient;
}
