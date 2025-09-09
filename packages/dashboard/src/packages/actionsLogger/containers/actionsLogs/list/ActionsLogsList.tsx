import React from 'react';
import Grid2 from '@mui/material/Grid2';
import {sx} from './sx'
import Spinner from "@ui/spinner/Spinner";
import {useGetActionsLogs} from "@packages/actionsLogger/containers/actionsLogs/hooks/useGetActionsLogs";
import {ActionLog} from "@packages/actionsLogger/containers/actionsLogs/types";
import {
    useGetActionsLogsListState
} from "@packages/actionsLogger/containers/actionsLogs/list/hooks/useGetActionsLogsListState";
import ActionsLogsListView from "@packages/actionsLogger/containers/actionsLogs/list/view/ActionsLogsListView";
import ActionsLogsListSidebar
    from "@packages/actionsLogger/containers/actionsLogs/list/view/sidebar/ActionsLogsListSidebar";


const ActionsLogsList = () => {

    const actionsLogsListState = useGetActionsLogsListState()

    const {
        actionsLogs,
        totalPage,
        getActionsLogs,
        isLoading
    } = useGetActionsLogs()

    const onChangeSort = ({
                              order,
                              orderBy,
                          }: {
        order: 'desc' | 'asc',
        orderBy: keyof ActionLog
    }) => {
        getActionsLogs({
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

    const onChangePage = (page: number) => {
        getActionsLogs({
            action: actionsLogsListState.action,
            database: actionsLogsListState.database,
            dateStart: actionsLogsListState.dateStart,
            dateEnd: actionsLogsListState.dateEnd,
            dbType: actionsLogsListState.dbType,
            openUserId: actionsLogsListState.openUserId,
            page,
            perPage: 20,
            rowId: actionsLogsListState.rowId,
            orderBy: actionsLogsListState.orderBy,
            serviceKey: actionsLogsListState.serviceKey,
            order: actionsLogsListState.order,
            table: actionsLogsListState.table,
        })
    }

    return (
        <>
            {isLoading && <Spinner variant={'overlay'}/>}

            <Grid2
                container
                spacing={1}
            >
                <Grid2
                    size={9}
                >
                    <ActionsLogsListView
                        isLoading={isLoading}
                        actionsLogsListState={actionsLogsListState}
                        actionsLogs={actionsLogs}
                        totalPage={totalPage}
                        onChangeSort={onChangeSort}
                        onChangePage={onChangePage}
                    />
                </Grid2>

                <Grid2
                    size={3}
                    sx={sx.sidebar}
                >
                    <ActionsLogsListSidebar
                        actionsLogsListState={actionsLogsListState}
                        getActionsLogs={getActionsLogs}
                    />
                </Grid2>
            </Grid2>
        </>
    );
};

export default ActionsLogsList;

