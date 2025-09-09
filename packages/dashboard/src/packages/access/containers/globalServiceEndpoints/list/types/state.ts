import {SetStateFn} from "@baseTypes/state";
import {
    GlobalServiceEndpoints,
    GlobalServiceEndpointsType
} from "@packages/access/containers/globalServiceEndpoints/types";

export type GlobalServiceEndpointsListState = {
    order: 'asc' | 'desc'
    setOrder: SetStateFn<'asc' | 'desc'>
    orderBy: keyof GlobalServiceEndpoints
    setOrderBy: SetStateFn<keyof GlobalServiceEndpoints>
    page: number
    setPage: SetStateFn<number>
    targetGlobalServiceEndpoints: GlobalServiceEndpoints | null
    setTargetGlobalServiceEndpoints: SetStateFn<GlobalServiceEndpoints | null>
    openModal: boolean
    setOpenModal: SetStateFn<boolean>
    serviceKey: string
    setServiceKey: SetStateFn<string>
    type: GlobalServiceEndpointsType | ''
    setType: SetStateFn<GlobalServiceEndpointsType | ''>
}