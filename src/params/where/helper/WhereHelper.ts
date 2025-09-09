import {WhereParams} from '@params'
import {AppRequest} from '@appRequest'


export class WhereHelper {
    static getWhereFromReq<T extends object>(req: AppRequest): WhereParams<T> {
        return req.query.where as WhereParams<T>
    }
}
