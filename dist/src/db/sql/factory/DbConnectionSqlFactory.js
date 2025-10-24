"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionSqlFactory = void 0;
const core_1 = require("../../core");
const _di_1 = require("../../../di");
const _appConfig_1 = require("../../../appConfig");
const _appError_1 = require("../../../appError");
class DbConnectionSqlFactory {
    static async getDynamicByLeId(legalEntityId) {
        const configLoader = _di_1.DiContainer.resolve(core_1.LoaderDbConnectionSqlConfigByLeId);
        const config = await configLoader.getConfig(legalEntityId);
        const key = 'dbDatabase' in config ? config.dbDatabase : config.cashedKey;
        const dbConnectionFromCash = core_1.DbConnectionSqlCashManager.getFromCash(key);
        if (dbConnectionFromCash) {
            return dbConnectionFromCash;
        }
        const connection = new core_1.DbConnectionSql(config);
        core_1.DbConnectionSqlCashManager.saveToCash(key, connection);
        if (config.hasKeepConnectionAlive) {
            core_1.DbConnectionSqKeepConnectionAlive.keepConnectionAlive(connection);
        }
        return connection;
    }
    static async getDynamicByDomain(domain) {
        const configLoader = _di_1.DiContainer.resolve(core_1.LoaderDbConnectionSqlConfigByDomain);
        const config = await configLoader.getConfig(domain);
        const key = 'dbDatabase' in config ? config.dbDatabase : config.cashedKey;
        const dbConnectionFromCash = core_1.DbConnectionSqlCashManager.getFromCash(key);
        if (dbConnectionFromCash) {
            return dbConnectionFromCash;
        }
        const connection = new core_1.DbConnectionSql(config);
        core_1.DbConnectionSqlCashManager.saveToCash(key, connection);
        if (config.hasKeepConnectionAlive) {
            core_1.DbConnectionSqKeepConnectionAlive.keepConnectionAlive(connection);
        }
        return connection;
    }
    static getStatic() {
        const configLoader = _di_1.DiContainer.resolve(core_1.LoaderDbConnectionSqlConfigStatic);
        const config = configLoader.getConfig();
        const key = 'dbDatabase' in config ? config.dbDatabase : config.cashedKey;
        const dbConnectionFromCash = core_1.DbConnectionSqlCashManager.getFromCash(key);
        if (dbConnectionFromCash) {
            return dbConnectionFromCash;
        }
        const connection = new core_1.DbConnectionSql(config);
        if (config.hasKeepConnectionAlive) {
            core_1.DbConnectionSqKeepConnectionAlive.keepConnectionAlive(connection);
        }
        core_1.DbConnectionSqlCashManager.saveToCash(key, connection);
        return connection;
    }
    static getForCheckReadiness() {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.sql.readinessDynamicSqlDatabaseName) {
            throw new _appError_1.AppError('Not found readiness dynamic sql database name in env');
        }
        return new core_1.DbConnectionSql({
            dialect: _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbDialect,
            host: _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbHost,
            port: _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbPort,
            charset: _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbCharset,
            dbDatabase: _appConfig_1.APP_CONFIG_OS_CORE.sql.readinessDynamicSqlDatabaseName,
            timezone: _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbTimezone,
            logging: false,
            dbUsername: _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbUsername,
            dbPassword: _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbPassword,
            hasKeepConnectionAlive: false,
        });
    }
}
exports.DbConnectionSqlFactory = DbConnectionSqlFactory;
//# sourceMappingURL=DbConnectionSqlFactory.js.map