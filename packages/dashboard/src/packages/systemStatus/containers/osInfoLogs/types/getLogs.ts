import {SystemOsLog} from "@packages/systemStatus/containers/osInfoLogs/types/index";

export type GetSystemStatusOsLogsProps  = {
    dateStart: Date
    dateEnd: Date
    page: number
    perPage: number
    order: 'asc' | 'desc'
    orderBy: keyof SystemOsLog
    serviceKeys: string[]
};

export type GetSystemOsLogs = (props:GetSystemStatusOsLogsProps)=>Promise<SystemOsLog[]>