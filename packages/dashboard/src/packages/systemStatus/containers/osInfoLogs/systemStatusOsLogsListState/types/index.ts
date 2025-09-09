import {SetStateFn} from "@baseTypes/state";
import {SystemOsLog} from "@packages/systemStatus/containers/osInfoLogs/types";

export interface SystemOsLogsListState {
    order: 'asc' | 'desc',
    setOrder: SetStateFn<'asc' | 'desc'>,
    orderBy: keyof SystemOsLog,
    setOrderBy: SetStateFn<keyof SystemOsLog>,
    page: number,
    setPage: SetStateFn<number>,
    serviceKeys: string[],
    setServiceKeys: (serviceKeys: string[]) => void,
    perPage: number
    dateStart: string
    dateEnd: string
    setDateStart: SetStateFn<string>
    setDateEnd: SetStateFn<string>

}