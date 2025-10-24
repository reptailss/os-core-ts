import React, {useState} from "react";
import {ActionLog, ActionLogType} from "@packages/actionsLogger/containers/actionsLogs/types";
import {getInitialPageParamRequestsList} from "@containers/requests/requestsList/helpers/getInitialParams";
import {
    getActionsLogsInitialDate
} from "@packages/actionsLogger/containers/actionsLogs/helpers/date/getActionsLogsInitialDate";
import {ActionsLogsListState} from "@packages/actionsLogger/containers/actionsLogs/list/types/state";

const {initialDateStart, initialDateEnd} = getActionsLogsInitialDate()

export function useGetActionsLogsListState(): ActionsLogsListState {
    const [dateStart, setDateStart] = useState<Date>(initialDateStart)
    const [dateEnd, setDateEnd] = useState<Date>(initialDateEnd)

    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof ActionLog>('date_add');
    const [page, setPage] = React.useState<number>(() => getInitialPageParamRequestsList());
    const [targetActionLog, setTargetActionLog] = React.useState<ActionLog | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)


    const [serviceKey, setServiceKey] = useState<string>('')
    const [dbType, setDbType] = useState<string>('')
    const [table, setTable] = useState<string>('')
    const [rowId, setRowId] = useState<string>('')
    const [database, setDatabase] = useState<string>('')
    const [action, setAction] = useState<ActionLogType | null>(null)
    const [openUserId, setOpenUserId] = useState<string>('')

    return {
        dateStart,
        setDateStart,
        dateEnd,
        setDateEnd,
        order,
        setOrder,
        orderBy,
        setOrderBy,
        page,
        setPage,
        targetActionLog,
        setTargetActionLog,
        openModal,
        setOpenModal,
        serviceKey,
        setServiceKey,
        dbType,
        setDbType,
        table,
        setTable,
        rowId,
        setRowId,
        database,
        setDatabase,
        action,
        setAction,
        openUserId,
        setOpenUserId,
    }
}