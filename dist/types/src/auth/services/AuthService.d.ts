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
}
