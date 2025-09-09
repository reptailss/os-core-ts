import {AppConfigHelper} from '@appConfig'
import 'dotenv/config'


type AppConfigOSCore = {
    serviceKey: string,
    servicePrefix: string | null
    servicePort: number
    hasCors: boolean
    structure: {
        useStructureAccess: boolean
    },
    logger: {
        hasRequestConsoleLogger: boolean
        hasSendActionSystemLogger: boolean
        hasSendOsStatusLogs: boolean
    },
    sql: {
        hasSql: boolean
        sqlDbType: 'dynamic' | 'static' | 'mix' | null
        staticDbDialect: 'mysql' | 'mariadb';
        staticDbHost: string
        staticDbPort: number
        staticDbUsername: string
        staticDbPassword: string
        staticDbDatabase: string
        staticDbCharset: string
        staticDbTimezone: string

        dynamicDbDialect: 'mysql' | 'mariadb'
        dynamicDbHost: string
        dynamicDbPort: number
        dynamicDbUsername: string
        dynamicDbPassword: string
        dynamicDbCharset: string
        dynamicDbTimezone: string
        readinessDynamicSqlDatabaseName: string
    },
    tokens: {
        systemAuthToken: string;
    },
    noSql: {
        hasNoSql: boolean
        protocol: string
        host: string
        port: number
        user: string
        password: string
        options: string
    },
    swagger: {
        hasSwagger: boolean
        defaultAuthToken: string
    },
    redis: {
        hasRedis: boolean
        redisType: 'static' | 'dynamic' | 'mix' | null
        redisDynamicHost: string
        redisDynamicPort: number
        redisDynamicPassword: string
        redisClientDatabasesPrefix: string

        redisStaticHost: string
        redisStaticPort: number
        redisStaticPassword: string
    },
    urls: {
        checkAuthServiceUrl: string | null
        authServiceUrl: string | null
        structureAccessServiceUrl: string | null
        actionsSystemLoggerServiceUrl: string | null
        warehouseSettingsServiceUrl: string | null
        ordersServiceUrl: string | null
        osStatusServiceUrl: string | null
        structureBmsServiceUrl: string | null
        sociumUsersServiceUrl: string | null
        bmsUsersServiceUrl: string | null
        cashbackProgramServiceUrl: string | null
        mobAppSettingsServiceUrl: string | null
        paymentMethodsServiceUrl: string | null
        warehouseProductsServiceUrl: string | null
        ptpUsersServiceUrl: string | null
        ptpCoreUsersServiceUrl: string | null
        ptpCoreGroupsServiceUrl: string | null
    },
    awsS3: {
        hasUploadToS3: boolean,
        bucket: string,
        region: string
        accessKey: string
        secretKey: string
    },

}

declare var process: {
    env: {
        INIT_SERVICE_KEY: string,
        INIT_SERVICE_PREFIX: string,
        INIT_SERVICE_PORT: string,
        INIT_HAS_CORS: '0' | '1'

        INIT_SQL_STATIC_DB_DIALECT: 'mysql' | 'mariadb'
        INIT_SQL_STATIC_DB_HOST: string
        INIT_SQL_STATIC_DB_PORT: string
        INIT_SQL_STATIC_DB_USERNAME: string
        INIT_SQL_STATIC_DB_DATABASE: string
        INIT_SQL_STATIC_DB_ENCODING: string
        INIT_SQL_STATIC_DB_PASSWORD: string
        INIT_SQL_STATIC_DB_TIMEZONE: string

        INIT_SQL_DYNAMIC_DB_DIALECT: 'mysql' | 'mariadb'
        INIT_SQL_DYNAMIC_DB_HOST: string
        INIT_SQL_DYNAMIC_DB_PORT: string
        INIT_SQL_DYNAMIC_DB_USERNAME: string
        INIT_SQL_DYNAMIC_DB_ENCODING: string
        INIT_SQL_DYNAMIC_DB_PASSWORD: string
        INIT_SQL_DYNAMIC_DB_TIMEZONE: string
        INIT_SQL_DYNAMIC_CHECK_READINESS_DATABASE_NAME: string,

        INIT_MONGODB_PROTOCOL: string
        INIT_MONGODB_HOST: string
        INIT_MONGODB_PORT: string
        INIT_MONGODB_USER: string
        INIT_MONGODB_PASSWORD: string
        INIT_MONGODB_DATABASE: string
        INIT_MONGODB_OPTIONS: string

        INIT_REDIS_DYNAMIC_HOST: string
        INIT_REDIS_DYNAMIC_PORT: string
        INIT_REDIS_DYNAMIC_PASSWORD: string
        INIT_REDIS_CLIENT_DATABASE_PREFIX: string
        INIT_REDIS_STATIC_HOST: string
        INIT_REDIS_STATIC_PORT: string
        INIT_REDIS_STATIC_PASSWORD: string

        INIT_USE_SWAGGER: '0' | '1'
        INIT_SWAGGER_VERSION: string
        INIT_SWAGGER_URL: string
        INIT_SWAGGER_TITLE: string
        INIT_SWAGGER_DESCRIPTION: string,
        INIT_SWAGGER_PATHS: string
        INIT_SWAGGER_DEFAULT_AUTH_TOKEN: string

        INIT_SYSTEM_AUTH_TOKEN: string
        INIT_USE_STRUCTURE_ACCESS: '0' | '1'
        INIT_URL_STRUCTURE_ACCESS_SERVICE: string
        INIT_URL_STRUCTURE_SERVICE: string
        INIT_URL_WAREHOUSE_SETTINGS_SERVICE: string
        INIT_URL_OS_STATUS_SERVICE: string
        INIT_URL_SOCIUM_USERS_SERVICE: string
        INIT_URL_BMS_USERS_SERVICE: string
        INIT_URL_CASHBACK_PROGRAM_SERVICE: string
        INIT_URL_ORDERS_SERVICE: string
        INIT_URL_PAYMENT_METHODS_SERVICE: string
        INIT_URL_WAREHOUSE_PRODUCTS_SERVICE: string
        INIT_URL_MOB_APP_SETTINGS_SERVICE: string
        INIT_URL_PTP_USERS_SERVICE: string
        INIT_URL_PTP_CORE_USERS_SERVICE: string
        INIT_URL_PTP_CORE_GROUPS_SERVICE: string

        INIT_HAS_CONSOLE_LOGGER_REQUESTS: '0' | '1'
        INIT_HAS_SEND_ACTION_SYSTEM_LOGGER: '0' | '1'

        INIT_URL_FOR_CHECK_AUTH: string
        INIT_URL_AUTH_SERVICE: string
        INIT_URL_TO_ACTIONS_SYSTEM_LOGGER_SERVICE: string


        INIT_HAS_AWS_S3_UPLOAD: string
        INIT_AWS_S3_BUCKET: string
        INIT_AWS_S3_REGION: string
        INIT_AWS_S3_ACCESS_KEY: string
        INIT_AWS_S3_SECRET_KEY: string
    }
}

export const APP_CONFIG_OS_CORE: AppConfigOSCore = {
    serviceKey: process.env.INIT_SERVICE_KEY,
    servicePrefix: process.env.INIT_SERVICE_PREFIX ? process.env.INIT_SERVICE_PREFIX : null,
    servicePort: Number(process.env.INIT_SERVICE_PORT || 3000),
    hasCors: process.env.INIT_HAS_CORS?.toString() !== '0',
    structure: {
        useStructureAccess: process.env.INIT_USE_STRUCTURE_ACCESS === '1',
    },
    sql: {
        hasSql: AppConfigHelper.checkHasSql(),
        sqlDbType: AppConfigHelper.getSqlType(),
        staticDbDialect: process.env.INIT_SQL_STATIC_DB_DIALECT || 'mysql',
        staticDbHost: process.env.INIT_SQL_STATIC_DB_HOST || '',
        staticDbPort: Number(process.env.INIT_SQL_STATIC_DB_PORT || 0),
        staticDbUsername: process.env.INIT_SQL_STATIC_DB_USERNAME || '',
        staticDbPassword: process.env.INIT_SQL_STATIC_DB_PASSWORD || '',
        staticDbDatabase: process.env.INIT_SQL_STATIC_DB_DATABASE || '',
        staticDbCharset: process.env.INIT_SQL_STATIC_DB_ENCODING || 'utf8',
        staticDbTimezone: process.env.INIT_SQL_STATIC_DB_TIMEZONE || '+00:00',

        dynamicDbDialect: process.env.INIT_SQL_DYNAMIC_DB_DIALECT || 'mysql',
        dynamicDbHost: process.env.INIT_SQL_DYNAMIC_DB_HOST || '',
        dynamicDbPort: Number(process.env.INIT_SQL_DYNAMIC_DB_PORT || 0),
        dynamicDbUsername: process.env.INIT_SQL_DYNAMIC_DB_USERNAME || '',
        dynamicDbPassword: process.env.INIT_SQL_DYNAMIC_DB_PASSWORD || '',
        dynamicDbCharset: process.env.INIT_SQL_DYNAMIC_DB_ENCODING || 'utf8',
        dynamicDbTimezone: process.env.INIT_SQL_DYNAMIC_DB_TIMEZONE || '+00:00',
        readinessDynamicSqlDatabaseName: process.env.INIT_SQL_DYNAMIC_CHECK_READINESS_DATABASE_NAME || '',
    },
    noSql: {
        hasNoSql: AppConfigHelper.checkHasNoSql(),
        protocol: process.env.INIT_MONGODB_PROTOCOL || '',
        host: process.env.INIT_MONGODB_HOST || '',
        port: Number(process.env.INIT_MONGODB_PORT || 0),
        user: process.env.INIT_MONGODB_USER || '',
        password: process.env.INIT_MONGODB_PASSWORD || '',
        options: process.env.INIT_MONGODB_OPTIONS || '',
    },
    redis: {
        redisType: AppConfigHelper.getRedisType(),
        hasRedis: AppConfigHelper.checkHasRedis(),
        redisDynamicHost: process.env.INIT_REDIS_DYNAMIC_HOST || '',
        redisDynamicPort: Number(process.env.INIT_REDIS_DYNAMIC_PORT || 0),
        redisDynamicPassword: process.env.INIT_REDIS_DYNAMIC_PASSWORD || '',
        redisClientDatabasesPrefix: process.env.INIT_REDIS_CLIENT_DATABASE_PREFIX || '',
        redisStaticHost: process.env.INIT_REDIS_STATIC_HOST || '',
        redisStaticPort: Number(process.env.INIT_REDIS_STATIC_PORT || '0'),
        redisStaticPassword: process.env.INIT_REDIS_STATIC_PASSWORD || '',
    },
    swagger: {
        hasSwagger: process.env.INIT_USE_SWAGGER === '1',
        defaultAuthToken: process.env.INIT_SWAGGER_DEFAULT_AUTH_TOKEN || '',
    },
    tokens: {
        systemAuthToken: process.env.INIT_SYSTEM_AUTH_TOKEN || '',
    },
    logger: {
        hasRequestConsoleLogger: process.env.INIT_HAS_CONSOLE_LOGGER_REQUESTS === '1',
        hasSendActionSystemLogger: process.env.INIT_HAS_SEND_ACTION_SYSTEM_LOGGER !== '0',
        hasSendOsStatusLogs: process.env.INIT_URL_OS_STATUS_SERVICE?.length >= 1,
    },
    urls: {
        checkAuthServiceUrl: process.env.INIT_URL_FOR_CHECK_AUTH || null,
        authServiceUrl: process.env.INIT_URL_AUTH_SERVICE || null,
        actionsSystemLoggerServiceUrl: process.env.INIT_URL_TO_ACTIONS_SYSTEM_LOGGER_SERVICE || null,
        structureAccessServiceUrl: process.env.INIT_URL_STRUCTURE_ACCESS_SERVICE || null,
        structureBmsServiceUrl: process.env.INIT_URL_STRUCTURE_SERVICE || null,
        warehouseSettingsServiceUrl: process.env.INIT_URL_WAREHOUSE_SETTINGS_SERVICE || null,
        ordersServiceUrl: process.env.INIT_URL_ORDERS_SERVICE || null,
        osStatusServiceUrl: process.env.INIT_URL_OS_STATUS_SERVICE || null,
        sociumUsersServiceUrl: process.env.INIT_URL_SOCIUM_USERS_SERVICE || null,
        bmsUsersServiceUrl: process.env.INIT_URL_BMS_USERS_SERVICE || null,
        cashbackProgramServiceUrl: process.env.INIT_URL_CASHBACK_PROGRAM_SERVICE || null,
        paymentMethodsServiceUrl: process.env.INIT_URL_PAYMENT_METHODS_SERVICE || null,
        warehouseProductsServiceUrl: process.env.INIT_URL_WAREHOUSE_PRODUCTS_SERVICE || null,
        mobAppSettingsServiceUrl: process.env.INIT_URL_MOB_APP_SETTINGS_SERVICE || null,
        ptpUsersServiceUrl:process.env.INIT_URL_PTP_USERS_SERVICE || null,
        ptpCoreUsersServiceUrl:process.env.INIT_URL_PTP_CORE_USERS_SERVICE || null,
        ptpCoreGroupsServiceUrl:process.env.INIT_URL_PTP_CORE_GROUPS_SERVICE || null,
    },
    awsS3: {
        bucket: process.env.INIT_AWS_S3_BUCKET || '',
        region: process.env.INIT_AWS_S3_REGION || '',
        accessKey: process.env.INIT_AWS_S3_ACCESS_KEY || '',
        secretKey: process.env.INIT_AWS_S3_SECRET_KEY || '',
        hasUploadToS3: process.env.INIT_HAS_AWS_S3_UPLOAD === '1',
    },
}

