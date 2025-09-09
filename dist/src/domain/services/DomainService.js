"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainService = void 0;
const _appConfig_1 = require("../../appConfig");
const _redis_1 = require("../../redis");
const _appError_1 = require("../../appError");
class DomainService {
    static async getDatabaseNameByDomain(domain) {
        const key = `${_appConfig_1.APP_CONFIG_OS_CORE.redis.redisClientDatabasesPrefix}${domain}`;
        const databaseName = await _redis_1.RedisDynamicService.getValue(key);
        if (!databaseName) {
            throw new _appError_1.AppError('os-core:Database name not found by domain in redis', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        return databaseName;
    }
}
exports.DomainService = DomainService;
//# sourceMappingURL=DomainService.js.map