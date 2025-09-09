import {getQueryParams} from "@helpers/searchParams";
import {SystemOsLog} from "@packages/systemStatus/containers/osInfoLogs/types";

export const getInitialPageParamOsSystemOsInfoLogsList = (): number => {
    const pageParam = getQueryParams('page')
    if (!pageParam || isNaN(Number(pageParam))) {
        return 1
    }
    return Number(pageParam)
}


export const getInitialOrderParamOsSystemOsInfoLogsList = (): 'asc' | 'desc' => {
    const param = getQueryParams('order')
    if (!param || (param !== 'asc' && param !== 'desc')) {
        return 'desc'
    }
    return param
}


export const getInitialOrderByParamOsSystemOsInfoLogsList = (): keyof SystemOsLog => {
    const param = getQueryParams('orderBy')
    if (!param) {
        return 'date'
    }
    return param as keyof SystemOsLog
}
