import React from 'react';
import {SYSTEM_OS_INFO_CHARTS_COLUMNS} from "@packages/systemStatus/containers/osInfoLogs/charts/constants";
import CustomLineChart from "@ui/customLineChart/CustomLineChart";
import Stack from '@mui/material/Stack';
import {
    useGetSystemStatusOsInfoLogsState
} from "@packages/systemStatus/containers/osInfoLogs/systemStatusOsLogsListState/hooks/useGetSystemStatusOsInfoLogsListState";
import {useGetSystemStatusOsLogs} from "@packages/systemStatus/containers/osInfoLogs/hooks/useGetSystemStatusOsLogs";
import SystemOsLogsListSidebar from "@packages/systemStatus/containers/osInfoLogs/sidebar/SystemOsLogsListSidebar";
import {sx} from './sx'
import Spinner from '@ui/spinner/Spinner';
import SystemOsLogsListChartSidebar
    from "@packages/systemStatus/containers/osInfoLogs/charts/SystemOsLogsListChartSidebar";

const SystemOsInfoCharts = () => {

    const systemOsLogsListState = useGetSystemStatusOsInfoLogsState({
        perPage: 0
    })

    const {
        systemOsLogs,
        getSystemOsInfoLogs,
        isLoading,
    } = useGetSystemStatusOsLogs()

    return (
        <Stack
            sx={sx.root}
        >
            {isLoading && <Spinner variant={'overlay'} />}

            <CustomLineChart
                data={systemOsLogs}
                initialColumns={SYSTEM_OS_INFO_CHARTS_COLUMNS}
                sidebarChildren={<SystemOsLogsListChartSidebar
                    getSystemOsInfoLogs={getSystemOsInfoLogs}
                    systemOsLogsListState={systemOsLogsListState}
                />}
            />
        </Stack>
    );
};

export default SystemOsInfoCharts;