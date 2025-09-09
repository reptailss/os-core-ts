"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionSqlHelper = void 0;
const _appConfig_1 = require("../../../appConfig");
const _logger_1 = require("../../../logger");
class DbConnectionSqlHelper {
    static getTargetDynamicDbSqlOptions({ options, databaseName, }) {
        return {
            host: (options === null || options === void 0 ? void 0 : options.host) || _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbHost,
            port: (options === null || options === void 0 ? void 0 : options.port) || _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbPort,
            dbUsername: (options === null || options === void 0 ? void 0 : options.dbUsername) || _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbUsername,
            dbPassword: (options === null || options === void 0 ? void 0 : options.dbPassword) || _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbPassword,
            dialect: (options === null || options === void 0 ? void 0 : options.dialect) || _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbDialect,
            charset: (options === null || options === void 0 ? void 0 : options.charset) || _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbCharset,
            timezone: (options === null || options === void 0 ? void 0 : options.timezone) || _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbTimezone,
            logging: (options === null || options === void 0 ? void 0 : options.logging) || false,
            dbDatabase: databaseName,
        };
    }
    static getTargetStaticDbSqlOptions(options) {
        return {
            dialect: (options === null || options === void 0 ? void 0 : options.dialect) || _appConfig_1.APP_CONFIG_OS_CORE.sql.staticDbDialect,
            host: (options === null || options === void 0 ? void 0 : options.host) || _appConfig_1.APP_CONFIG_OS_CORE.sql.staticDbHost,
            port: (options === null || options === void 0 ? void 0 : options.port) || _appConfig_1.APP_CONFIG_OS_CORE.sql.staticDbPort,
            charset: (options === null || options === void 0 ? void 0 : options.charset) || _appConfig_1.APP_CONFIG_OS_CORE.sql.staticDbCharset,
            dbDatabase: (options === null || options === void 0 ? void 0 : options.dbDatabase) || _appConfig_1.APP_CONFIG_OS_CORE.sql.staticDbDatabase,
            timezone: (options === null || options === void 0 ? void 0 : options.timezone) || _appConfig_1.APP_CONFIG_OS_CORE.sql.staticDbTimezone,
            logging: (options === null || options === void 0 ? void 0 : options.logging) || false,
            dbUsername: (options === null || options === void 0 ? void 0 : options.dbUsername) || _appConfig_1.APP_CONFIG_OS_CORE.sql.staticDbUsername,
            dbPassword: (options === null || options === void 0 ? void 0 : options.dbPassword) || _appConfig_1.APP_CONFIG_OS_CORE.sql.staticDbPassword,
        };
    }
}
exports.DbConnectionSqlHelper = DbConnectionSqlHelper;
_a = DbConnectionSqlHelper;
DbConnectionSqlHelper.keepConnectionAlive = (connection) => {
    setInterval(async () => {
        try {
            await connection.query('SELECT 1');
        }
        catch (error) {
            _logger_1.appLogger.error('os-core: Error keep connection alive Sequelize', error);
        }
    }, 600000);
};
//# sourceMappingURL=DbConnectionSqlHelper.js.map