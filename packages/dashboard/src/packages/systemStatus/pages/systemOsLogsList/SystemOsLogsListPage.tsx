import React from 'react';
import Stack from "@mui/material/Stack";
import {sx} from './sx'
import SystemOsInfoLogsList from '@packages/systemStatus/containers/osInfoLogs/list/SystemOsInfoLogsList';


const SystemOsLogsListPage = () => {

    return (
        <Stack
            sx={sx.root}
        >
            <SystemOsInfoLogsList/>
        </Stack>
    );
};

export default SystemOsLogsListPage;
