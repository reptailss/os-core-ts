"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OsCoreBmsUsersService = void 0;
const _logger_1 = require("../../logger");
const _redis_1 = require("../../redis");
const _appConfig_1 = require("../../appConfig");
const _appError_1 = require("../../appError");
const _helpers_1 = require("../../helpers");
const _services_1 = require("..");
class OsCoreBmsUsersService {
    static async saveBmsUserToRedis({ legalEntityId, bmsUser, }) {
        await _redis_1.RedisStaticService.setValue(this.buildBmsUserByOpenIdRedisKey(bmsUser.open_id, legalEntityId), bmsUser.id.toString());
        await _redis_1.RedisStaticService.setMapValue(this.buildBmsUserByUserIdRedisKey(bmsUser.id, legalEntityId), {
            id: bmsUser.id.toString(),
            socium_user_id: bmsUser.socium_user_id.toString(),
            open_id: bmsUser.open_id.toString(),
            parent_open_id: bmsUser.parent_open_id.toString(),
            picture: bmsUser.picture || '',
            family_name: bmsUser.family_name || '',
            given_name: bmsUser.given_name || '',
            middle_name: bmsUser.middle_name || '',
            email: bmsUser.email || '',
            birthdate: bmsUser.birthdate || '',
            gender: bmsUser.gender || '',
            type_ids: bmsUser.type_ids || '',
            active: bmsUser.active.toString(),
        });
    }
    static async deleteUserFromRedis({ bmsUserId, openUserId, legalEntityId, }) {
        await _redis_1.RedisStaticService.deleteValue(this.buildBmsUserByOpenIdRedisKey(openUserId, legalEntityId));
        await _redis_1.RedisStaticService.deleteValue(this.buildBmsUserByUserIdRedisKey(bmsUserId, legalEntityId));
    }
    static async getBmsUserByOpenUserIdAndLegalEntityId(openUserId, legalEntityId) {
        const userFromRedis = await this.getBmsUserByOpenUserIdFromRedis(openUserId, legalEntityId);
        if (userFromRedis) {
            return userFromRedis;
        }
        const domain = await _services_1.OsCoreLegalEntityService.getDomainById(legalEntityId);
        if (!domain) {
            return null;
        }
        const userFromApi = await this.getBmsUserByOpenUserFromApi(openUserId, domain);
        if (!userFromApi) {
            return null;
        }
        await this.saveBmsUserToRedis({ legalEntityId, bmsUser: userFromApi });
        return userFromApi;
    }
    static async getBmsUserByOpenUserIdFromRedis(openUserId, legalEntityId) {
        const userId = await _redis_1.RedisStaticService.getValue(this.buildBmsUserByOpenIdRedisKey(openUserId, legalEntityId));
        if (!userId) {
            return null;
        }
        const bmsUser = await _redis_1.RedisStaticService.getMapValue(this.buildBmsUserByUserIdRedisKey(Number(userId), legalEntityId));
        if (!bmsUser || !('id' in bmsUser)) {
            return null;
        }
        return {
            id: Number(bmsUser.id),
            socium_user_id: Number(bmsUser.socium_user_id),
            open_id: openUserId,
            parent_open_id: Number(bmsUser.parent_open_id || 0),
            picture: bmsUser.picture || null,
            family_name: bmsUser.family_name,
            given_name: bmsUser.given_name,
            middle_name: bmsUser.middle_name || null,
            email: bmsUser.email || null,
            birthdate: bmsUser.birthdate || null,
            gender: bmsUser.gender,
            type_ids: bmsUser.type_ids || null,
            active: Number(bmsUser.active),
        };
    }
    static async getBmsUserByOpenUserFromApi(openUserId, domain) {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.urls.bmsUsersServiceUrl) {
            throw new _appError_1.AppError('Not found bms users api url in env', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        try {
            const responseUserFromApi = await _helpers_1.SystemRequestHelper.get({
                serviceKey: 'bms_users',
                params: {
                    open_id: openUserId,
                },
                headers: {
                    origin: domain,
                },
                url: _appConfig_1.APP_CONFIG_OS_CORE.urls.bmsUsersServiceUrl + _helpers_1.SystemEndpointsHelper.buildSystemEndpointUrl('/get-by-open-id'),
            });
            if (!(responseUserFromApi === null || responseUserFromApi === void 0 ? void 0 : responseUserFromApi.row)) {
                _logger_1.appLogger.error('os-core-ts:not found from api bms user');
                return null;
            }
            return {
                id: responseUserFromApi.row.id,
                socium_user_id: responseUserFromApi.row.socium_user_id,
                open_id: openUserId,
                parent_open_id: responseUserFromApi.row.parent_open_id,
                picture: responseUserFromApi.row.picture,
                family_name: responseUserFromApi.row.family_name,
                given_name: responseUserFromApi.row.given_name,
                middle_name: responseUserFromApi.row.middle_name,
                email: responseUserFromApi.row.email,
                birthdate: responseUserFromApi.row.birthdate,
                gender: responseUserFromApi.row.gender,
                type_ids: responseUserFromApi.row.type_ids,
                active: responseUserFromApi.row.active,
            };
        }
        catch (error) {
            _logger_1.appLogger.error('os-core-ts:not found from api bms user', error);
            return null;
        }
    }
    static buildBmsUserByOpenIdRedisKey(openUserId, legalEntityId) {
        return `socium_bms:${legalEntityId}:users:by_open_id:${openUserId}`;
    }
    static buildBmsUserByUserIdRedisKey(userId, legalEntityId) {
        return `socium_bms:${legalEntityId}:users:by_id:${userId}`;
    }
}
exports.OsCoreBmsUsersService = OsCoreBmsUsersService;
//# sourceMappingURL=OsCoreBmsUsersService.js.map