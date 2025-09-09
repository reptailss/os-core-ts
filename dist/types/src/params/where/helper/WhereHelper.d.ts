import { WhereParams } from "../..";
import { AppRequest } from "../../../appRequest";
export declare class WhereHelper {
    static getWhereFromReq<T extends object>(req: AppRequest): WhereParams<T>;
}
