import { FullUserInfo, UserInfo } from "..";
export declare class AuthService {
    static checkTokenAndGetUserInfo(token: string): Promise<UserInfo>;
    static checkSystemTokenAndGetUserInfo(token: string): Promise<UserInfo>;
    static getFullUserInfoByToken(accessToken: string): Promise<FullUserInfo>;
    static introspect(token: string): Promise<{
        userId?: number;
        active: boolean;
        exp_at: number;
        exp_in: number;
        type: 'ACCESS_TOKEN';
        client_id: string;
        username: string;
        scope: string;
        system_token?: 0 | 1;
    }>;
}
