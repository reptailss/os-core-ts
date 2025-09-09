import { OrderParams } from "../..";
import { AppRequest } from "../../../appRequest";
export declare class OrderHelper {
    static getOrderFromReq<Row extends object, AllowedKeysOrder extends keyof Row = keyof Row>(req: AppRequest): OrderParams<Row, AllowedKeysOrder>;
}
