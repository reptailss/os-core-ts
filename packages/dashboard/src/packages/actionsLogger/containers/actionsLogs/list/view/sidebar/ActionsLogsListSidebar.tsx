import React, {useEffect} from 'react';
import {Stack, TextField} from "@mui/material";
import DatePickerRangeSidebar from "@ui/date/datePickerRange/DatePickerRangeSidebar";
import {sx} from './sx'
import Button from "@mui/material/Button";
import {ActionsLogsListState} from "@packages/actionsLogger/containers/actionsLogs/list/types/state";
import {GetActionsLogs} from "@packages/actionsLogger/containers/actionsLogs/types/events";
import SelectActionLogType
    from "@packages/actionsLogger/containers/actionsLogs/select/selectActionLogType/SelectActionLogType";
import SelectActionsLogsServiceKey
    from "@packages/actionsLogger/containers/actionsLogs/select/selectActionsLogsServiceKey/SelectActionsLogsServiceKey";
import SelectActionLogDbType
    from "@packages/actionsLogger/containers/actionsLogs/select/selectActionLogDbType/SelectActionLogDbType";

interface Props {
    getActionsLogs: GetActionsLogs
    actionsLogsListState: ActionsLogsListState
}

const ActionsLogsListSidebar = ({
                                    getActionsLogs,
                                    actionsLogsListState,
                                }: Props) => {


    const onSaveDate = async ({
                                  dateStart,
                                  dateEnd,
                              }: {
        dateStart: Date,
        dateEnd: Date
    }) => {
        actionsLogsListState.setDateStart(dateStart)
        actionsLogsListState.setDateEnd(dateEnd)
        actionsLogsListState.setPage(1)
    }

    const onFetchRequests = async () => {
        await getActionsLogs({
            action: actionsLogsListState.action,
            database: actionsLogsListState.database,
            dateStart: actionsLogsListState.dateStart,
            dateEnd: actionsLogsListState.dateEnd,
            dbType: actionsLogsListState.dbType,
            openUserId: actionsLogsListState.openUserId,
            page: actionsLogsListState.page,
            perPage: 20,
            rowId: actionsLogsListState.rowId,
            orderBy: actionsLogsListState.orderBy,
            serviceKey: actionsLogsListState.serviceKey,
            order: actionsLogsListState.order,
            table: actionsLogsListState.table,
        })
    }

    function onChangeWithResetPage<Value>(value: Value, cb: (value: Value) => void) {
        cb(value)
        actionsLogsListState.setPage(1)
    }

    return (
        <Stack
            direction={'column'}
            gap={2}
            sx={sx.root}
        >
            <DatePickerRangeSidebar
                initialDateStart={actionsLogsListState.dateStart}
                initialDateEnd={actionsLogsListState.dateEnd}
                onSave={onSaveDate}
            />

            <SelectActionLogType
                value={actionsLogsListState.action}
                onChange={(value) => onChangeWithResetPage(value, actionsLogsListState.setAction)}
            />

            <SelectActionsLogsServiceKey
                value={actionsLogsListState.serviceKey}
                onChange={(value) => onChangeWithResetPage(value, actionsLogsListState.setServiceKey)}
            />

            <SelectActionLogDbType
                value={actionsLogsListState.dbType}
                onChange={(value) => onChangeWithResetPage(value, actionsLogsListState.setDbType)}
            />

            <TextField
                size={'small'}
                fullWidth
                value={actionsLogsListState.database}
                onChange={(event) => onChangeWithResetPage(event.target.value, actionsLogsListState.setDatabase)}
                label={'Назва бд'}
            />

            <TextField
                size={'small'}
                fullWidth
                value={actionsLogsListState.table}
                onChange={(event) => onChangeWithResetPage(event.target.value, actionsLogsListState.setTable)}
                label={'Назва таблиці'}
            />

            <TextField
                size={'small'}
                fullWidth
                value={actionsLogsListState.rowId}
                onChange={(event) => onChangeWithResetPage(event.target.value, actionsLogsListState.setRowId)}
                label={'ID Рядка'}
            />

            <TextField
                size={'small'}
                fullWidth
                value={actionsLogsListState.openUserId}
                onChange={(event) => onChangeWithResetPage(event.target.value, actionsLogsListState.setOpenUserId)}
                label={'ID користувача(open_user_id)'}
            />


            <Button
                onClick={onFetchRequests}
                variant={'contained'}
                sx={sx.btn}
                fullWidth
            >
                Пошук
            </Button>
        </Stack>
    );
};

export default ActionsLogsListSidebar;

