import {ServerRequestsData} from "@containers/requests/types";
import {ServerMeta} from "@containers/requests/types/meta";
import {RequestErrorStatus} from "@containers/requests/types/errorStatus";

export type SystemStatusServerRequestsResponse = ServerRequestsData & {
    all_pages: number
    all_rows: number
    error: boolean
    page: number
    per_page: number
}

export  type GetSystemStatusServerRequestsParams =  {
    dateStart: string
    dateEnd: string,
    page: number
    perPage: number
    order: 'asc' | 'desc',
    orderBy: keyof ServerMeta,
    targetEndpoints: string[],
    statusCodes: (string | number)[],
    errorStatus: RequestErrorStatus,
    errorCodes: string[]
}