import { FullUserDto } from "../../../auth";
export declare class DashboardUserService {
    static checkAccessByToken(token: string): Promise<FullUserDto>;
}
