"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OsCoreLegalEntityService = void 0;
const _redis_1 = require("../../redis");
const _appError_1 = require("../../appError");
class OsCoreLegalEntityService {
    static async getIdByDomain(domain) {
        const leId = await _redis_1.RedisStaticService.getValue(`socium:legal_entities:by_host:${domain}`);
        if (!leId) {
            throw new _appError_1.AppError('os-core:Legal entity id not found by domain in redis', {
                errorKey: 'DOMAIN_ACCESS_DENIED_ERROR',
            });
        }
        return Number(leId);
    }
    static async getDomainById(legalEntityId) {
        const info = await _redis_1.RedisStaticService.getMapValue(this.getInfoLegalEntityRedisKey(legalEntityId));
        if (!info) {
            throw new _appError_1.AppError(`os-core:Not found legal entity info id in redis`, {
                errorKey: 'NOT_FOUND_ERROR',
            });
        }
        if (typeof (info === null || info === void 0 ? void 0 : info.bms_host) !== 'string') {
            throw new _appError_1.AppError(`os-core:Domain not found by Legal entity id in redis`, {
                errorKey: 'NOT_FOUND_ERROR',
            });
        }
        return info.bms_host;
    }
    static async getDbConfigById(legalEntityId) {
        const config = await _redis_1.RedisStaticService.getMapValue(this.getInfoLegalEntityRedisKey(legalEntityId));
        if (!config || !('system_db' in config)) {
            throw new _appError_1.AppError(`os-core:Config db not found by legal entity id(${legalEntityId}) in redis`, {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        const systemDb = JSON.parse(config.system_db);
        if (!(systemDb === null || systemDb === void 0 ? void 0 : systemDb.port) ||
            !(systemDb === null || systemDb === void 0 ? void 0 : systemDb.port) ||
            !(systemDb === null || systemDb === void 0 ? void 0 : systemDb.username) ||
            !(systemDb === null || systemDb === void 0 ? void 0 : systemDb.password) ||
            !(systemDb === null || systemDb === void 0 ? void 0 : systemDb.database)) {
            throw new _appError_1.AppError(`os-core:Config fields db not found by legal entity id(${legalEntityId}) in redis`, {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        return {
            host: systemDb.host,
            port: Number(systemDb.port),
            username: systemDb.username,
            password: systemDb.password,
            database: systemDb.database,
        };
    }
    static async getInfoById(legalEntityId) {
        const info = await _redis_1.RedisStaticService.getMapValue(this.getInfoLegalEntityRedisKey(legalEntityId));
        if (!info) {
            throw new _appError_1.AppError(`os-core:Legal entity info not found by legal entity id(${legalEntityId}) in redis`, {
                errorKey: 'NOT_FOUND_ERROR',
            });
        }
        return {
            name: typeof (info === null || info === void 0 ? void 0 : info.name) === 'string' ? info.name : '',
            typeId: typeof (info === null || info === void 0 ? void 0 : info.type_id) === 'string' ? Number(info.type_id) : 0,
            ownerSociumUserId: typeof (info === null || info === void 0 ? void 0 : info.owner_socium_user_id) === 'string' ? Number(info.owner_socium_user_id) : 0,
        };
    }
    static async getBmsSettingsById(legalEntityId) {
        const settings = await _redis_1.RedisStaticService.getMapValue(`socium_bms:${legalEntityId}:settings`);
        if (!settings) {
            throw new _appError_1.AppError(`os-core:Legal entity bms settings not found by legal entity id(${legalEntityId}) in redis`, {
                errorKey: 'NOT_FOUND_ERROR',
            });
        }
        return {
            logo: typeof (settings === null || settings === void 0 ? void 0 : settings.logo) === 'string' ? settings.logo : null,
        };
    }
    static getInfoLegalEntityRedisKey(legalEntityId) {
        return `socium:legal_entities:by_id:${legalEntityId}`;
    }
}
exports.OsCoreLegalEntityService = OsCoreLegalEntityService;
//# sourceMappingURL=OsCoreLegalEntityService.js.map