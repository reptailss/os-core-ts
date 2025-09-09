import React from 'react';
import Stack from "@mui/material/Stack";
import {sx} from './sx'
import SystemOsInfoCharts from "@packages/systemStatus/containers/osInfoLogs/charts/SystemOsInfoCharts";


const SystemOsLogsChartsPage = () => {

    return (
        <Stack
            sx={sx.root}
        >
            <SystemOsInfoCharts/>
        </Stack>
    );
};

export default SystemOsLogsChartsPage;
