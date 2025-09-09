"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OsCorePtpCoreGroupsService = void 0;
const _appConfig_1 = require("../../appConfig");
const _appError_1 = require("../../appError");
const _helpers_1 = require("../../helpers");
const _redis_1 = require("../../redis");
const _logger_1 = require("../../logger");
class OsCorePtpCoreGroupsService {
    static async getGroupByApiKeys({ apiAccessKey, apiSecretKey, }) {
        const groupFromRedis = await this.getGroupByApiKeysFromRedis({
            apiAccessKey,
            apiSecretKey,
        });
        if (groupFromRedis) {
            return groupFromRedis;
        }
        const groupFromApi = await this.getGroupByApiKeysFromApi({
            apiAccessKey,
            apiSecretKey,
        });
        if (!groupFromApi) {
            return null;
        }
        try {
            await this.saveGroupToRedis(groupFromApi);
        }
        catch (error) {
            _logger_1.appLogger.error('error save group to redis', error);
        }
        return groupFromApi;
    }
    static async saveGroupToRedis(ptpGroup) {
        await _redis_1.RedisStaticService.setMapValue(this.buildGroupRedisKey({
            apiAccessKey: ptpGroup.api_access_keys,
            apiSecretKey: ptpGroup.api_secret_key,
        }), {
            api_access_keys: ptpGroup.api_access_keys,
            api_secret_key: ptpGroup.api_secret_key,
            open_user_id: ptpGroup.open_user_id.toString(),
            name: ptpGroup.name,
            description: ptpGroup.description,
            city_id: ptpGroup.city_id.toString(),
            active: ptpGroup.active.toString(),
            hide: ptpGroup.hide.toString(),
            id: ptpGroup.id.toString(),
            domain: ptpGroup.domain,
        });
    }
    static async deleteGroupFromRedis({ apiAccessKey, apiSecretKey, }) {
        await _redis_1.RedisStaticService.deleteValue(this.buildGroupRedisKey({
            apiAccessKey,
            apiSecretKey,
        }));
    }
    static async getGroupByApiKeysFromRedis({ apiAccessKey, apiSecretKey, }) {
        const ptpGroup = await _redis_1.RedisStaticService.getMapValue(this.buildGroupRedisKey({
            apiAccessKey,
            apiSecretKey,
        }));
        if (!ptpGroup || !('id' in ptpGroup)) {
            return null;
        }
        return {
            api_access_keys: ptpGroup.api_access_keys,
            api_secret_key: ptpGroup.api_secret_key,
            open_user_id: Number(ptpGroup.open_user_id),
            name: ptpGroup.name,
            description: ptpGroup.description,
            city_id: Number(ptpGroup.city_id),
            active: Number(ptpGroup.active),
            hide: Number(ptpGroup.hide),
            id: Number(ptpGroup.id),
            domain: ptpGroup.domain,
        };
    }
    static async getGroupByApiKeysFromApi({ apiAccessKey, apiSecretKey, }) {
        var _a;
        if (!_appConfig_1.APP_CONFIG_OS_CORE.urls.ptpCoreGroupsServiceUrl) {
            throw new _appError_1.AppError('Not found ptp users service url in env', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        try {
            const response = await _helpers_1.SystemRequestHelper.get({
                url: _appConfig_1.APP_CONFIG_OS_CORE.urls.ptpCoreGroupsServiceUrl + '/get-by-api-keys',
                headers: {
                    api_access_key: apiAccessKey,
                    api_secret_key: apiSecretKey,
                },
                serviceKey: 'ptp-core-groups',
            });
            if (!((_a = response === null || response === void 0 ? void 0 : response.row) === null || _a === void 0 ? void 0 : _a.id)) {
                return null;
            }
            return response.row;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core-ts:not found ptp group from api', error);
            return null;
        }
    }
    static buildGroupRedisKey({ apiAccessKey, apiSecretKey, }) {
        return `ptp_core:api_groups:${apiAccessKey}_${apiSecretKey}`;
    }
}
exports.OsCorePtpCoreGroupsService = OsCorePtpCoreGroupsService;
//# sourceMappingURL=OsCorePtpCoreGroupsService.js.map