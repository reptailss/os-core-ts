import {SystemOsLog} from "@packages/systemStatus/containers/osInfoLogs/types/index";

export type GetSystemStatusOsLogsProps  = {
    dateStart: string,
    dateEnd: string,
    page: number
    perPage: number
    order: 'asc' | 'desc',
    orderBy: keyof SystemOsLog,
    serviceKeys: string[]
};

export type GetSystemOsLogs = (props:GetSystemStatusOsLogsProps)=>Promise<SystemOsLog[]>