import { PtpCoreUserDto } from "..";
export declare class PtpCoreUserService {
    static checkTokenAndGetUser({ token, roles, }: {
        token: string;
        roles?: Array<'admin'>;
    }): Promise<PtpCoreUserDto>;
}
