"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const _appConfig_1 = require("../../appConfig");
const _appError_1 = require("../../appError");
const _helpers_1 = require("../../helpers");
class AuthService {
    static async checkTokenAndGetUserInfo(token) {
        const response = await this.introspect(token);
        if (!(response === null || response === void 0 ? void 0 : response.active) || !(response === null || response === void 0 ? void 0 : response.userId)) {
            throw new _appError_1.AppError('Invalid bearer token', {
                errorKey: 'INVALID_BEARER_TOKEN_ERROR',
            });
        }
        return {
            open_user_id: response.userId,
            user_name: response.username,
            is_system: response.system_token === 1,
        };
    }
    static async checkSystemTokenAndGetUserInfo(token) {
        var _a;
        const response = await this.introspect(token);
        if (!(response === null || response === void 0 ? void 0 : response.userId)) {
            throw new _appError_1.AppError('Url for validate token was send not valid response', {
                errorKey: 'INVALID_BEARER_TOKEN_ERROR',
            });
        }
        const isSystem = ((_a = response.system_token) === null || _a === void 0 ? void 0 : _a.toString()) === '1';
        if (!isSystem) {
            throw new _appError_1.AppError('The token must be system', {
                errorKey: 'INVALID_BEARER_TOKEN_ERROR',
            });
        }
        return {
            open_user_id: response.userId,
            user_name: response.username,
            is_system: isSystem,
        };
    }
    static async getFullUserInfoByToken(accessToken) {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.urls.authServiceUrl) {
            throw new _appError_1.AppError('Not found auth api url in env');
        }
        return await _helpers_1.RequestHelper.get({
            url: _appConfig_1.APP_CONFIG_OS_CORE.urls.authServiceUrl + `/v1/userinfo?access_token=${accessToken}`,
        });
    }
    static async introspect(token) {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.urls.checkAuthServiceUrl) {
            throw new _appError_1.AppError('Not found check auth api url in env', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        return _helpers_1.RequestHelper.post({
            url: _appConfig_1.APP_CONFIG_OS_CORE.urls.checkAuthServiceUrl,
            params: {
                token_type_hint: 'access_token',
                token: token.slice(7),
            },
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map