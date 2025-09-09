import React from 'react';
import Stack from "@mui/material/Stack";
import {sx} from './sx'
import ServerLogsView from "@containers/serverLogs/ServerLogsView";
import {useGetSystemStatusServerLogs} from "@packages/systemStatus/containers/serverLogs/hooks/useGetServerLogs";


const SystemStatusLogsPage = () => {

    const {
        logs,
        refetch,
        isLoading,
    } = useGetSystemStatusServerLogs()

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

export default SystemStatusLogsPage;
