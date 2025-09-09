import React from 'react';
import {sx} from './sx'
import Spinner from "@ui/spinner/Spinner";
import {useGetSystemStatusOsLogs} from "@packages/systemStatus/containers/osInfoLogs/hooks/useGetSystemStatusOsLogs";
import {
    useGetSystemStatusOsInfoLogsState
} from "@packages/systemStatus/containers/osInfoLogs/systemStatusOsLogsListState/hooks/useGetSystemStatusOsInfoLogsListState";
import SystemOsLogsListView from "@packages/systemStatus/containers/osInfoLogs/view/SystemOsLogsListView";
import SystemOsLogsListSidebar from "@packages/systemStatus/containers/osInfoLogs/sidebar/SystemOsLogsListSidebar";
import Stack from "@mui/material/Stack";
import {SystemOsLog} from "@packages/systemStatus/containers/osInfoLogs/types";

const SystemOsInfoLogsList = () => {

    const systemOsLogsListState = useGetSystemStatusOsInfoLogsState()

    const {
        systemOsLogs,
        totalPage,
        getSystemOsInfoLogs,
        isLoading
    } = useGetSystemStatusOsLogs()

    const onChangeSort = ({
                              order,
                              orderBy,
                          }: {
        order: 'desc' | 'asc',
        orderBy: keyof SystemOsLog
    }) => {
        getSystemOsInfoLogs({
            order,
            orderBy,
            dateStart: systemOsLogsListState.dateStart,
            dateEnd: systemOsLogsListState.dateEnd,
            serviceKeys: systemOsLogsListState.serviceKeys,
            page: systemOsLogsListState.page,
            perPage: systemOsLogsListState.perPage,
        })
    }

    const onChangePage = (page: number) => {
        getSystemOsInfoLogs({
            order: systemOsLogsListState.order,
            orderBy: systemOsLogsListState.orderBy,
            dateStart: systemOsLogsListState.dateStart,
            dateEnd: systemOsLogsListState.dateEnd,
            serviceKeys: systemOsLogsListState.serviceKeys,
            page,
            perPage: systemOsLogsListState.perPage,
        })
    }

    return (
        <>
            {isLoading && <Spinner variant={'overlay'}/>}

            <Stack>
                <Stack
                    direction={'row'}
                    gap={1}
                    flexWrap={'wrap'}
                    alignItems={'center'}
                >
                    <SystemOsLogsListSidebar
                        getSystemOsInfoLogs={getSystemOsInfoLogs}
                        systemOsLogsListState={systemOsLogsListState}
                        selectWith={'300px'}
                    />
                </Stack>

                <SystemOsLogsListView
                    isLoading={isLoading}
                    systemOsLogsListState={systemOsLogsListState}
                    systemOsLogs={systemOsLogs}
                    totalPage={totalPage}
                    sxTable={sx.table}
                    onChangeSort={onChangeSort}
                    onChangePage={onChangePage}
                />
            </Stack>
        </>
    );
};

export default SystemOsInfoLogsList;

