import { FullUserDto, UserDto } from "..";
export declare class AuthService {
    static checkTokenAndGetUser(token: string): Promise<UserDto>;
    static checkSystemTokenAndGetUser(token: string): Promise<UserDto>;
    static getFullUserByToken(accessToken: string): Promise<FullUserDto>;
    static systemGetUserByOpenUserId(openUserId: number): Promise<{
        id: number;
        family_name: string;
        given_name: string;
        middle_name: string | null;
        email: string | null;
        birthdate: string | null;
        picture: string | null;
        parent_id: number | null;
        gender: 'male' | 'female' | null;
    } | null>;
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
    private static requestApi;
}
