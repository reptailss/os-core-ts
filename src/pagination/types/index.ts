import {OrderParams, WhereParams} from '@params'

export type PaginationValues<
    Row extends object,
> = {
    page: number,
    all_pages: number,
    all_rows: number,
    per_page: number,
    rows: Row[];
}


export type PaginationQueryParams<
    Row extends object,
    AllowedKeysWhere extends keyof Row = keyof Row,
    AllowedKeysOrder extends keyof Row = keyof Row,
> = {
    page?: number
    per_page?: number
    where?:WhereParams<Row,AllowedKeysWhere>,
    order?:OrderParams<Row,AllowedKeysOrder>
}