"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OsCorePtpClientUsersService = void 0;
const _helpers_1 = require("../../helpers");
const _appConfig_1 = require("../../appConfig");
const _appError_1 = require("../../appError");
class OsCorePtpClientUsersService {
    static async introspect({ token, domain, }) {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.urls.ptpUsersServiceUrl) {
            throw new _appError_1.AppError('Not found ptp users service url in env', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        return _helpers_1.SystemRequestHelper.get({
            url: _appConfig_1.APP_CONFIG_OS_CORE.urls.ptpUsersServiceUrl + '/introspect',
            headers: {
                token,
                domain,
            },
            serviceKey: 'ptp-users',
        });
    }
    static async getRoles({ openUserId, domain, }) {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.urls.ptpUsersServiceUrl) {
            throw new _appError_1.AppError('Not found ptp users service url in env', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        const response = await _helpers_1.SystemRequestHelper.get({
            url: _appConfig_1.APP_CONFIG_OS_CORE.urls.ptpUsersServiceUrl + `/get-roles/${openUserId}`,
            headers: {
                domain,
            },
            serviceKey: 'ptp-core-users',
        });
        return {
            isAdmin: response.is_admin === 1,
        };
    }
}
exports.OsCorePtpClientUsersService = OsCorePtpClientUsersService;
//# sourceMappingURL=OsCorePtpClientUsersService.js.map