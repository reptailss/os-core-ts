import * as React from "react";
import {useState} from "react";
import {SystemOsLog} from "@packages/systemStatus/containers/osInfoLogs/types";
import {SystemOsLogsListState} from "@packages/systemStatus/containers/osInfoLogs/systemStatusOsLogsListState/types";
import {
    getInitialOrderByParamOsSystemOsInfoLogsList,
    getInitialOrderParamOsSystemOsInfoLogsList,
    getInitialPageParamOsSystemOsInfoLogsList
} from "@packages/systemStatus/containers/osInfoLogs/systemStatusOsLogsListState/helpers/getInitialParams";
import {useGetRequestDateRangeState} from "@containers/requests/requestsState/hooks/useGetRequestDateRangeState";
import {
    getSystemOsLogsInitialDate
} from "@packages/systemStatus/containers/osInfoLogs/systemStatusOsLogsListState/helpers/getRequestsInitialDate";

const{
    initialDateStart,
    initialDateEnd
} = getSystemOsLogsInitialDate()
export function useGetSystemStatusOsInfoLogsState({perPage}: {
    perPage?: number
} = {}): SystemOsLogsListState {

    const [order, setOrder] = React.useState<'asc' | 'desc'>(() => getInitialOrderParamOsSystemOsInfoLogsList());
    const [orderBy, setOrderBy] = React.useState<keyof SystemOsLog>(() => getInitialOrderByParamOsSystemOsInfoLogsList());
    const [page, setPage] = React.useState(() => getInitialPageParamOsSystemOsInfoLogsList());
    const [serviceKeys, setServiceKeys] = useState<string[]>([])
    const [dateStart, setDateStart] = useState<string>(initialDateStart)
    const [dateEnd, setDateEnd] = useState<string>(initialDateEnd)


    return {
        order,
        setOrder,
        orderBy,
        setOrderBy,
        page,
        setPage,
        perPage: perPage || 100,
        setServiceKeys,
        serviceKeys,
        dateStart,
        setDateStart,
        dateEnd,
        setDateEnd,

    }
}