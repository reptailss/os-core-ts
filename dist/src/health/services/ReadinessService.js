"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadinessService = void 0;
const _appConfig_1 = require("../../appConfig");
const _db_1 = require("../../db");
const _redis_1 = require("../../redis");
const _files_1 = require("../../files");
const _logger_1 = require("../../logger");
class ReadinessService {
    async getReadiness() {
        let readinessInfo = {};
        if (_appConfig_1.APP_CONFIG_OS_CORE.sql.hasSql) {
            readinessInfo.mysql = await this.checkSqlDbReadiness();
        }
        if (_appConfig_1.APP_CONFIG_OS_CORE.redis.hasRedis) {
            const res = await this.checkRedisReadiness();
            readinessInfo = Object.assign(Object.assign({}, readinessInfo), res);
        }
        if (_appConfig_1.APP_CONFIG_OS_CORE.noSql.hasNoSql) {
            readinessInfo.mongo_db = 'success';
        }
        if (_appConfig_1.APP_CONFIG_OS_CORE.awsS3.hasUploadToS3) {
            readinessInfo.aws = await this.checkAwsS3();
        }
        const response = {
            status: 'ok',
            code: 200,
            info: readinessInfo,
        };
        for (const key in readinessInfo) {
            const status = readinessInfo[key];
            if (status === 'error') {
                response.status = 'bad';
                response.code = 500;
                break;
            }
        }
        return response;
    }
    async checkSqlDbReadiness() {
        if (_appConfig_1.APP_CONFIG_OS_CORE.sql.sqlDbType === 'mix') {
            const dynamicDb = await this.checkDynamicDbSql();
            const staticDb = await this.checkStaticDbSql();
            return dynamicDb === 'success' && staticDb === 'success' ? 'success' : 'error';
        }
        if (_appConfig_1.APP_CONFIG_OS_CORE.sql.sqlDbType === 'static') {
            return await this.checkStaticDbSql();
        }
        if (_appConfig_1.APP_CONFIG_OS_CORE.sql.sqlDbType === 'dynamic') {
            return await this.checkDynamicDbSql();
        }
        return 'success';
    }
    ;
    async checkDynamicDbSql() {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.sql.readinessDynamicSqlDatabaseName) {
            _logger_1.appLogger.error('Not found readiness dynamic sql database name in env');
            return 'error';
        }
        try {
            const connection = _db_1.DbConnectionSqlFactory.getForCheckReadiness();
            await connection.checkConnection();
            await connection.close();
            return 'success';
        }
        catch (e) {
            return 'error';
        }
    }
    async checkStaticDbSql() {
        try {
            const dbConnection = _db_1.DbConnectionSqlFactory.getStatic();
            await dbConnection.checkConnection();
            return 'success';
        }
        catch (e) {
            return 'error';
        }
    }
    async checkRedisReadiness() {
        const res = {};
        if (_appConfig_1.APP_CONFIG_OS_CORE.redis.redisType === 'static' || _appConfig_1.APP_CONFIG_OS_CORE.redis.redisType === 'mix') {
            res.redis_db = await this.checkRedisStaticReadiness();
        }
        if (_appConfig_1.APP_CONFIG_OS_CORE.redis.redisType === 'dynamic' || _appConfig_1.APP_CONFIG_OS_CORE.redis.redisType === 'mix') {
            res.redis_db = await this.checkRedisDynamicReadiness();
        }
        return res;
    }
    async checkRedisDynamicReadiness() {
        try {
            const hasConnection = await _redis_1.RedisDynamicService.checkConnection();
            if (!hasConnection) {
                return 'error';
            }
            return 'success';
        }
        catch (error) {
            return 'error';
        }
    }
    ;
    async checkRedisStaticReadiness() {
        try {
            const hasConnection = await _redis_1.RedisStaticService.checkConnection();
            if (!hasConnection) {
                return 'error';
            }
            return 'success';
        }
        catch (error) {
            return 'error';
        }
    }
    ;
    async checkAwsS3() {
        try {
            const hasConnection = await _files_1.FileService.checkAwsS3();
            if (!hasConnection) {
                return 'error';
            }
            return 'success';
        }
        catch (error) {
            return 'error';
        }
    }
}
exports.ReadinessService = ReadinessService;
//# sourceMappingURL=ReadinessService.js.map