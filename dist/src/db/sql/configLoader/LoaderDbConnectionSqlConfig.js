"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoaderDbConnectionSqlConfigByDomain = exports.LoaderDbConnectionSqlConfigByLeId = exports.LoaderDbConnectionSqlConfigStatic = void 0;
const _appConfig_1 = require("../../../appConfig");
const _decorators_1 = require("../../../decorators");
const _domain_1 = require("../../../domain");
const _services_1 = require("../../../services");
let LoaderDbConnectionSqlConfigStatic = class LoaderDbConnectionSqlConfigStatic {
    getConfig() {
        return {
            dialect: _appConfig_1.APP_CONFIG_OS_CORE.sql.staticDbDialect,
            host: _appConfig_1.APP_CONFIG_OS_CORE.sql.staticDbHost,
            port: _appConfig_1.APP_CONFIG_OS_CORE.sql.staticDbPort,
            charset: _appConfig_1.APP_CONFIG_OS_CORE.sql.staticDbCharset,
            dbDatabase: _appConfig_1.APP_CONFIG_OS_CORE.sql.staticDbDatabase,
            timezone: _appConfig_1.APP_CONFIG_OS_CORE.sql.staticDbTimezone,
            logging: false,
            dbUsername: _appConfig_1.APP_CONFIG_OS_CORE.sql.staticDbUsername,
            dbPassword: _appConfig_1.APP_CONFIG_OS_CORE.sql.staticDbPassword,
            hasKeepConnectionAlive: true
        };
    }
};
exports.LoaderDbConnectionSqlConfigStatic = LoaderDbConnectionSqlConfigStatic;
exports.LoaderDbConnectionSqlConfigStatic = LoaderDbConnectionSqlConfigStatic = __decorate([
    (0, _decorators_1.Injectable)()
], LoaderDbConnectionSqlConfigStatic);
let LoaderDbConnectionSqlConfigByLeId = class LoaderDbConnectionSqlConfigByLeId {
    async getConfig(legalEntityId) {
        const { database, password, port, host, username, } = await _services_1.OsCoreLegalEntityService.getDbConfigById(legalEntityId);
        return {
            dialect: _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbDialect,
            host,
            port,
            charset: _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbCharset,
            dbDatabase: database,
            timezone: _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbTimezone,
            logging: false,
            dbUsername: username,
            dbPassword: password,
            hasKeepConnectionAlive: true
        };
    }
};
exports.LoaderDbConnectionSqlConfigByLeId = LoaderDbConnectionSqlConfigByLeId;
exports.LoaderDbConnectionSqlConfigByLeId = LoaderDbConnectionSqlConfigByLeId = __decorate([
    (0, _decorators_1.Injectable)()
], LoaderDbConnectionSqlConfigByLeId);
let LoaderDbConnectionSqlConfigByDomain = class LoaderDbConnectionSqlConfigByDomain {
    async getConfig(domain) {
        const databaseName = await _domain_1.DomainService.getDatabaseNameByDomain(domain);
        return {
            dialect: _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbDialect,
            host: _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbHost,
            port: _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbPort,
            charset: _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbCharset,
            dbDatabase: databaseName,
            timezone: _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbTimezone,
            logging: false,
            dbUsername: _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbUsername,
            dbPassword: _appConfig_1.APP_CONFIG_OS_CORE.sql.dynamicDbPassword,
            hasKeepConnectionAlive: true
        };
    }
};
exports.LoaderDbConnectionSqlConfigByDomain = LoaderDbConnectionSqlConfigByDomain;
exports.LoaderDbConnectionSqlConfigByDomain = LoaderDbConnectionSqlConfigByDomain = __decorate([
    (0, _decorators_1.Injectable)()
], LoaderDbConnectionSqlConfigByDomain);
//# sourceMappingURL=LoaderDbConnectionSqlConfig.js.map