import { AppRequest } from "../../appRequest";
export declare class AuthHelper {
    static getTokenFromReq(req: AppRequest): string;
    static buildAuthHeaders(authToken: string): {
        authorization: string;
    };
}
