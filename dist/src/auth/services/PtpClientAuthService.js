"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PtpClientAuthService = void 0;
const _appError_1 = require("../../appError");
const _services_1 = require("../../services");
class PtpClientAuthService {
    static async checkTokenAndGetUserInfo({ token, domain, roles, }) {
        const response = await _services_1.OsCorePtpClientUsersService.introspect({
            token,
            domain,
        });
        if (!(response === null || response === void 0 ? void 0 : response.active) || !(response === null || response === void 0 ? void 0 : response.userId)) {
            throw new _appError_1.AppError('Invalid bearer token', {
                errorKey: 'INVALID_BEARER_TOKEN_ERROR',
            });
        }
        if (roles &&
            roles.length &&
            roles.includes('admin') &&
            response.is_admin !== 1) {
            throw new _appError_1.AppError(`User must be an admin role`, {
                errorKey: 'UNAUTHORIZED_ERROR',
            });
        }
        return {
            open_user_id: response.userId,
            user_name: response.username,
            is_admin: response.is_admin === 1,
            is_system: response.system_token === 1,
        };
    }
}
exports.PtpClientAuthService = PtpClientAuthService;
//# sourceMappingURL=PtpClientAuthService.js.map