import {SetStateFn} from "@baseTypes/state";
import {TransformServerMeta} from "@containers/requests/types/transform";
import {ServerMeta} from "@containers/requests/types/meta";
import {RequestErrorStatus} from "@containers/requests/types/errorStatus";

export interface RequestsState {
    targetEndpoints: string[],
    setTargetEndpoints: SetStateFn<string[]>,
    dateStartRequests: string,
    setDateStartRequests: SetStateFn<string>,
    dateEndRequests: string,
    setDateEndRequests: SetStateFn<string>
}

export interface RequestsListState {
    order: 'asc' | 'desc',
    setOrder: SetStateFn<'asc' | 'desc'>,
    orderBy: keyof ServerMeta,
    setOrderBy: SetStateFn<keyof ServerMeta>,
    page: number,
    setPage: SetStateFn<number>,
    targetRequest: TransformServerMeta | null,
    setTargetRequest: SetStateFn<TransformServerMeta | null>,
    openModal: boolean,
    setOpenModal: SetStateFn<boolean>,
    perPage: number
    statusCodes: string[],
    setStatusCodes: (statusCodes: string[]) => void,
    errorCodes: string[],
    setErrorCodes: (statusCodes: string[]) => void,
    errorStatus: RequestErrorStatus,
    setErrorStatus: (errorStatus: RequestErrorStatus) => void,
    targetEndpoints:string[],
    setTargetEndpoints:SetStateFn<string[]>,
    dateStart: string
    dateEnd: string
    setDateStart: SetStateFn<string>
    setDateEnd: SetStateFn<string>
}