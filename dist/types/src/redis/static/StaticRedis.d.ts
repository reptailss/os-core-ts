import Redis from 'ioredis';
export declare class RedisStaticService {
    static deleteValue(key: string): Promise<number>;
    static getValue(key: string): Promise<string | null>;
    static setValue(key: string, value: string): Promise<void>;
    static getMapValue(key: string): Promise<Record<string, string>>;
    static getMapValueByFieldKey(key: string, fieldKey: string): Promise<string | null>;
    static setMapValue(key: string, value: Record<string, string>): Promise<void>;
    static deleteMapValue(key: string, fieldKey: string): Promise<number>;
    static getClient(): Promise<Redis>;
    static setMultipleValues(data: Record<string, string>): Promise<void>;
    static setMultipleMapValues(map: Record<string, Record<string, string>>): Promise<void>;
    static deleteMultipleValues(keys: string[]): Promise<void>;
    static deleteMapFieldsPipeline(map: Record<string, string[]>): Promise<void>;
    static checkConnection(): Promise<boolean>;
    private static getRedisStaticClient;
    private static getNewRedisClient;
}
