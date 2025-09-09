import {SetStateFn} from "@baseTypes/state";
import {ActionLog, ActionLogType} from "@packages/actionsLogger/containers/actionsLogs/types";

export type ActionsLogsListState = {
    dateStart: string
    setDateStart: SetStateFn<string>
    dateEnd: string
    setDateEnd: SetStateFn<string>
    order: 'asc' | 'desc'
    setOrder: SetStateFn<'asc' | 'desc'>
    orderBy: keyof ActionLog
    setOrderBy: SetStateFn<keyof ActionLog>
    page: number
    setPage: SetStateFn<number>
    targetActionLog: ActionLog | null
    setTargetActionLog: SetStateFn<ActionLog | null>
    openModal: boolean
    setOpenModal: SetStateFn<boolean>
    serviceKey: string
    setServiceKey: SetStateFn<string>
    dbType: string
    setDbType: SetStateFn<string>
    table: string
    setTable: SetStateFn<string>
    rowId: string
    setRowId: SetStateFn<string>
    database: string
    setDatabase: SetStateFn<string>
    action: ActionLogType | null
    setAction: SetStateFn<ActionLogType | null>
    openUserId: string
    setOpenUserId: SetStateFn<string>
}