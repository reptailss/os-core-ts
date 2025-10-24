"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PtpCoreUserService = void 0;
class PtpCoreUserService {
    static async checkTokenAndGetUser({ token, roles, }) {
        return {
            open_user_id: 1,
            user_name: '',
            is_admin: true,
            is_system: false,
        };
    }
}
exports.PtpCoreUserService = PtpCoreUserService;
//# sourceMappingURL=PtpCoreUserService.js.map