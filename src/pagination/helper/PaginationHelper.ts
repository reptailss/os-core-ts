import {OrderHelper, WhereHelper} from '@params'
import {AppRequest} from '@appRequest'

export class PaginationHelper {
    static getParamsFromReq<T extends object>(req: AppRequest) {
        const page = req?.query?.page || 1
        const perPage = req?.query?.per_page || 10
        const where = WhereHelper.getWhereFromReq<T>(req)
        const order = OrderHelper.getOrderFromReq<T>(req)
        
        return {
            page: parseInt(page?.toString()),
            per_page: parseInt(perPage?.toString()),
            where,
            order,
        }
    }
}
