export declare class OsCorePtpCoreUsersService {
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
        is_admin: 0 | 1;
    }>;
    static getRoles(openUserId: number): Promise<{
        isAdmin: boolean;
    }>;
}
