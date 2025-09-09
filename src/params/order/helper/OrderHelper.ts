import {OrderParams} from '@params'
import {AppRequest} from '@appRequest'

export class OrderHelper {
    static getOrderFromReq<Row extends object, AllowedKeysOrder extends keyof Row = keyof Row>(req: AppRequest): OrderParams<Row, AllowedKeysOrder> {
        return req?.query?.order as OrderParams<Row, AllowedKeysOrder>
    }
}
