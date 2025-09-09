import { FullUserInfo } from "../../../auth";
export declare class DashboardAccessService {
    static checkAccessByToken(token: string): Promise<FullUserInfo>;
}
