export declare class AppConfigHelper {
    static checkHasNoSql(): boolean;
    static checkHasDynamicRedis(): boolean;
    static checkHasStaticRedis(): boolean;
    static checkHasRedis(): boolean;
    static getRedisType(): 'dynamic' | 'static' | 'mix' | null;
    static checkHasStaticSql(): boolean;
    static checkHasDynamicSql(): boolean;
    static checkHasSql(): boolean;
    static getSqlType(): 'dynamic' | 'static' | 'mix' | null;
}
