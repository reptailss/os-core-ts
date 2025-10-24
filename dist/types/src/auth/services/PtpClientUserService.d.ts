import { PtpClientUserDto } from "..";
export declare class PtpClientUserService {
    static checkTokenAndGetUser({ token, domain, roles, }: {
        token: string;
        domain: string;
        roles?: Array<'admin'>;
    }): Promise<PtpClientUserDto>;
}
