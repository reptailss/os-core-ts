"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const _appConfig_1 = require("../../appConfig");
const _appError_1 = require("../../appError");
class AuthService {
    static async checkTokenAndGetUser(token) {
        const response = await this.introspect(token);
        if (!response.active || !response.userId) {
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
    static async checkSystemTokenAndGetUser(token) {
        var _a;
        const response = await this.introspect(token);
        if (!response.active || !response.userId) {
            throw new _appError_1.AppError('Invalid bearer token', {
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
    static async getFullUserByToken(accessToken) {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.urls.authServiceUrl) {
            throw new _appError_1.AppError('Not found auth api url in env');
        }
        return this.requestApi({
            url: _appConfig_1.APP_CONFIG_OS_CORE.urls.authServiceUrl + `/v1/userinfo?access_token=${accessToken}`,
        });
    }
    static async systemGetUserByOpenUserId(openUserId) {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.urls.authServiceUrl) {
            throw new _appError_1.AppError('Not found auth api url in env', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        const response = await this.requestApi({
            url: _appConfig_1.APP_CONFIG_OS_CORE.urls.authServiceUrl + `/user/read?reqBody=${openUserId}`,
            headers: {
                Authorization: _appConfig_1.APP_CONFIG_OS_CORE.tokens.systemAuthToken,
            },
        });
        if (!response.res.id) {
            return null;
        }
        return {
            id: response.res.id,
            birthdate: response.res.birthdate,
            email: response.res.email,
            given_name: response.res.given_name,
            middle_name: response.res.middle_name,
            parent_id: response.res.parent_id,
            family_name: response.res.family_name,
            picture: response.res.picture,
            gender: response.res.gender
        };
    }
    static async introspect(token) {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.urls.checkAuthServiceUrl) {
            throw new _appError_1.AppError('Not found check auth api url in env', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        return this.requestApi({
            url: `${_appConfig_1.APP_CONFIG_OS_CORE.urls.checkAuthServiceUrl}?token_type_hint=access_token&token=${token.slice(7)}`,
        });
    }
    static async requestApi({ url, headers, }) {
        let response;
        try {
            response = await fetch(url, {
                headers,
                method: 'GET',
            });
        }
        catch (error) {
            throw new _appError_1.AppError('Service authorization request failed', {
                errorKey: 'UNAUTHORIZED_ERROR',
            });
        }
        const res = await response.json();
        if ('errorMsg' in res && res.errorMsg ||
            !response.ok) {
            throw new _appError_1.AppError(res.errorMsg || 'Invalid bearer token', {
                errorKey: 'INVALID_BEARER_TOKEN_ERROR',
            });
        }
        return res;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map