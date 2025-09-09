import { AppRequest } from "../../appRequest";
export declare class PaginationHelper {
    static getParamsFromReq<T extends object>(req: AppRequest): {
        page: number;
        per_page: number;
        where: import("../../params").WhereParams<T>;
        order: import("../../params").OrderParams<T, keyof T>;
    };
}
