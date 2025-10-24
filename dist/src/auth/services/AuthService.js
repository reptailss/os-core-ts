"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
class AuthService {
    static async checkTokenAndGetUser(token) {
        return {
            open_user_id: 1,
            user_name: 'User',
            is_system: false,
        };
    }
    static async checkSystemTokenAndGetUser(token) {
        return {
            open_user_id: 1,
            user_name: 'User',
            is_system: true,
        };
    }
    static async getFullUserByToken(accessToken) {
        return {
            id: 1,
            name: 'timon',
            nickname: '',
            profile: '',
            picture: '',
            website: '',
            email: '',
            gender: '',
            birthdate: '',
            locale: '',
            address: '',
            parent_id: 1,
            referral_code: 1,
            given_name: 'timon',
            family_name: 'pubma',
            middle_name: 'pubma',
            preferred_username: '',
            email_verified: 1,
            phone_number: '',
            phone_number_verified: 1,
            updated_at: 1,
            use_2fa_auth: 0,
            use_2fa_sms: 0,
            use_2fa_email: 0,
            roles: ['ROLE_DASHBOARD_ADMIN'],
            sub: '',
        };
    }
    static async systemGetUserByOpenUserId(openUserId) {
        return {
            id: 1,
            birthdate: '',
            email: '',
            given_name: 'timon',
            middle_name: 'pumba',
            parent_id: 1,
            family_name: 'pumba',
            picture: '',
            gender: 'male',
        };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map