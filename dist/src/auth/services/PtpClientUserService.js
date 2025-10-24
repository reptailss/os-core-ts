"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PtpClientUserService = void 0;
class PtpClientUserService {
    static async checkTokenAndGetUser({ token, domain, roles, }) {
        return {
            open_user_id: 1,
            user_name: 'pubma',
            is_admin: true,
            is_system: false,
        };
    }
}
exports.PtpClientUserService = PtpClientUserService;
//# sourceMappingURL=PtpClientUserService.js.map