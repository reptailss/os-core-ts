"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OsCorePtpCoreUsersService = void 0;
const _helpers_1 = require("../../helpers");
const _appConfig_1 = require("../../appConfig");
const _appError_1 = require("../../appError");
class OsCorePtpCoreUsersService {
    static async introspect(token) {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.urls.ptpCoreUsersServiceUrl) {
            throw new _appError_1.AppError('Not found ptp core users service url in env', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        return _helpers_1.SystemRequestHelper.get({
            url: _appConfig_1.APP_CONFIG_OS_CORE.urls.ptpCoreUsersServiceUrl + '/introspect',
            headers: {
                token,
            },
            serviceKey: 'ptp-core-users',
        });
    }
    static async getRoles(openUserId) {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.urls.ptpCoreUsersServiceUrl) {
            throw new _appError_1.AppError('Not found ptp core users service url in env', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        const response = await _helpers_1.SystemRequestHelper.get({
            url: _appConfig_1.APP_CONFIG_OS_CORE.urls.ptpCoreUsersServiceUrl + `/get-roles/${openUserId}`,
            serviceKey: 'ptp-users',
        });
        return {
            isAdmin: response.is_admin === 1,
        };
    }
}
exports.OsCorePtpCoreUsersService = OsCorePtpCoreUsersService;
//# sourceMappingURL=OsCorePtpCoreUsersService.js.map