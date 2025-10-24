"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardUserService = void 0;
const _auth_1 = require("../../../auth");
const _appError_1 = require("../../../appError");
class DashboardUserService {
    static async checkAccessByToken(token) {
        var _a;
        const response = await _auth_1.AuthService.getFullUserByToken(token);
        if (!((_a = response === null || response === void 0 ? void 0 : response.roles) === null || _a === void 0 ? void 0 : _a.length) ||
            !response.roles.includes('ROLE_DASHBOARD_ADMIN')) {
            throw new _appError_1.AppError('Access denied: user must have the ROLE_DASHBOARD_ADMIN role');
        }
        return response;
    }
}
exports.DashboardUserService = DashboardUserService;
//# sourceMappingURL=DashboardUserService.js.map