"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_CONFIG_OS_CORE = void 0;
const _appConfig_1 = require("..");
require("dotenv/config");
exports.APP_CONFIG_OS_CORE = {
    serviceKey: process.env.INIT_SERVICE_KEY,
    servicePrefix: process.env.INIT_SERVICE_PREFIX ? process.env.INIT_SERVICE_PREFIX : null,
    servicePort: Number(process.env.INIT_SERVICE_PORT || 3000),
    hasCors: ((_a = process.env.INIT_HAS_CORS) === null || _a === void 0 ? void 0 : _a.toString()) !== '0',
    structure: {
        useStructureAccess: process.env.INIT_USE_STRUCTURE_ACCESS === '1',
    },
    sql: {
        hasSql: _appConfig_1.AppConfigHelper.checkHasSql(),
        sqlDbType: _appConfig_1.AppConfigHelper.getSqlType(),
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
        hasNoSql: _appConfig_1.AppConfigHelper.checkHasNoSql(),
        protocol: process.env.INIT_MONGODB_PROTOCOL || '',
        host: process.env.INIT_MONGODB_HOST || '',
        port: Number(process.env.INIT_MONGODB_PORT || 0),
        user: process.env.INIT_MONGODB_USER || '',
        password: process.env.INIT_MONGODB_PASSWORD || '',
        options: process.env.INIT_MONGODB_OPTIONS || '',
    },
    redis: {
        redisType: _appConfig_1.AppConfigHelper.getRedisType(),
        hasRedis: _appConfig_1.AppConfigHelper.checkHasRedis(),
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
        hasSendOsStatusLogs: ((_b = process.env.INIT_URL_OS_STATUS_SERVICE) === null || _b === void 0 ? void 0 : _b.length) >= 1,
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
        ptpUsersServiceUrl: process.env.INIT_URL_PTP_USERS_SERVICE || null,
        ptpCoreUsersServiceUrl: process.env.INIT_URL_PTP_CORE_USERS_SERVICE || null,
        ptpCoreGroupsServiceUrl: process.env.INIT_URL_PTP_CORE_GROUPS_SERVICE || null,
    },
    awsS3: {
        bucket: process.env.INIT_AWS_S3_BUCKET || '',
        region: process.env.INIT_AWS_S3_REGION || '',
        accessKey: process.env.INIT_AWS_S3_ACCESS_KEY || '',
        secretKey: process.env.INIT_AWS_S3_SECRET_KEY || '',
        hasUploadToS3: process.env.INIT_HAS_AWS_S3_UPLOAD === '1',
    },
};
//# sourceMappingURL=appConfig.js.map