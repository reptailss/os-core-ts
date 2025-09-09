import {getQueryParams} from "@helpers/searchParams";
import {TransformServerMeta} from "@containers/requests/types/transform";
import {ServerMeta} from "@containers/requests/types/meta";

export const getInitialPageParamRequestsList = (): number => {
    const pageParam = getQueryParams('page')
    if (!pageParam || isNaN(Number(pageParam))) {
        return 1
    }
    return Number(pageParam)
}


export const getInitialOrderParamRequestsList = (): 'asc' | 'desc' => {
    const param = getQueryParams('order')
    if (!param || (param !== 'asc' && param !== 'desc')) {
        return 'desc'
    }
    return param
}


export const getInitialOrderByParamRequestsList = (): keyof ServerMeta => {
    const param = getQueryParams('orderBy')
    if (!param) {
        return 'date'
    }
    return param as keyof ServerMeta
}
