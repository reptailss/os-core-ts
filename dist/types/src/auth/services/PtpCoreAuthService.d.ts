import { PtpCoreUserInfo } from "..";
export declare class PtpCoreAuthService {
    static checkTokenAndGetUserInfo({ token, roles, }: {
        token: string;
        roles?: Array<'admin'>;
    }): Promise<PtpCoreUserInfo>;
}
