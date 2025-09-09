import React from 'react';
import Stack from "@mui/material/Stack";
import {sx} from './sx'
import ServerLogsView from "@containers/serverLogs/ServerLogsView";
import {useGetDashboardServiceServerLogs} from "@packages/dashboardService/containers/serverLogs/hooks/useGetServerLogs";


const DashboardServiceLogsPage = () => {

    const {
        logs,
        refetch,
        isLoading,
    } = useGetDashboardServiceServerLogs()

    return (
        <Stack
            sx={sx.root}
        >
            <ServerLogsView
                logs={logs}
                refetch={refetch}
                isLoading={isLoading}
            />
        </Stack>
    );
};

export default DashboardServiceLogsPage;
