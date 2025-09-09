import React from 'react';
import Stack from "@mui/material/Stack";
import {sx} from './sx'
import SystemStatusRequestsCharts from "@packages/systemStatus/containers/requests/charts/SystemStatusRequestsCharts";


const SystemStatusRequestsChartsPage = () => {

    return (
        <Stack
            sx={sx.root}
        >
            <SystemStatusRequestsCharts/>
        </Stack>
    );
};

export default SystemStatusRequestsChartsPage;
