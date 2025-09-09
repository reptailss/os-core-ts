type BmsUser = {
    id: number;
    socium_user_id: number;
    open_id: number;
    parent_open_id: number;
    picture: string | null;
    family_name: string;
    given_name: string;
    middle_name: string | null;
    email: string | null;
    birthdate: string | null;
    gender: string;
    type_ids: string | null;
    active: 0 | 1;
};
export declare class OsCoreBmsUsersService {
    static saveBmsUserToRedis({ legalEntityId, bmsUser, }: {
        legalEntityId: number;
        bmsUser: BmsUser;
    }): Promise<void>;
    static deleteUserFromRedis({ bmsUserId, openUserId, legalEntityId, }: {
        openUserId: number;
        bmsUserId: number;
        legalEntityId: number;
    }): Promise<void>;
    static getBmsUserByOpenUserIdAndLegalEntityId(openUserId: number, legalEntityId: number): Promise<BmsUser | null>;
    static getBmsUserByOpenUserIdFromRedis(openUserId: number, legalEntityId: number): Promise<BmsUser | null>;
    static getBmsUserByOpenUserFromApi(openUserId: number, domain: string): Promise<BmsUser | null>;
    private static buildBmsUserByOpenIdRedisKey;
    private static buildBmsUserByUserIdRedisKey;
}
export {};
