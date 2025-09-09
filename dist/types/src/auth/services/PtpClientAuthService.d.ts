import { PtpClientUserInfo } from "..";
export declare class PtpClientAuthService {
    static checkTokenAndGetUserInfo({ token, domain, roles, }: {
        token: string;
        domain: string;
        roles?: Array<'admin'>;
    }): Promise<PtpClientUserInfo>;
}
