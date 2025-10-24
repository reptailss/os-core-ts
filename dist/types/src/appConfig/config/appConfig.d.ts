import 'dotenv/config';
type AppConfigOSCore = {
    serviceKey: string;
    servicePrefix: string | null;
    servicePort: number;
    hasCors: boolean;
    structure: {
        useStructureAccess: boolean;
    };
    logger: {
        hasRequestConsoleLogger: boolean;
        hasSendActionSystemLogger: boolean;
        hasSendOsStatusLogs: boolean;
    };
    sql: {
        hasSql: boolean;
        sqlDbType: 'dynamic' | 'static' | 'mix' | null;
        staticDbDialect: 'mysql' | 'mariadb';
        staticDbHost: string;
        staticDbPort: number;
        staticDbUsername: string;
        staticDbPassword: string;
        staticDbDatabase: string;
        staticDbCharset: string;
        staticDbTimezone: string;
        dynamicDbDialect: 'mysql' | 'mariadb';
        dynamicDbHost: string;
        dynamicDbPort: number;
        dynamicDbUsername: string;
        dynamicDbPassword: string;
        dynamicDbCharset: string;
        dynamicDbTimezone: string;
        readinessDynamicSqlDatabaseName: string;
    };
    tokens: {
        systemAuthToken: string;
    };
    noSql: {
        hasNoSql: boolean;
        protocol: string;
        host: string;
        port: number;
        user: string;
        password: string;
        options: string;
    };
    swagger: {
        hasSwagger: boolean;
        defaultAuthToken: string;
    };
    redis: {
        hasRedis: boolean;
        redisType: 'static' | 'dynamic' | 'mix' | null;
        redisDynamicHost: string;
        redisDynamicPort: number;
        redisDynamicPassword: string;
        redisClientDatabasesPrefix: string;
        redisStaticHost: string;
        redisStaticPort: number;
        redisStaticPassword: string;
    };
    urls: {
        checkAuthServiceUrl: string | null;
        authServiceUrl: string | null;
        structureAccessServiceUrl: string | null;
        actionsSystemLoggerServiceUrl: string | null;
        osStatusServiceUrl: string | null;
    };
    awsS3: {
        hasUploadToS3: boolean;
        bucket: string;
        region: string;
        accessKey: string;
        secretKey: string;
    };
};
export declare const APP_CONFIG_OS_CORE: AppConfigOSCore;
export {};
