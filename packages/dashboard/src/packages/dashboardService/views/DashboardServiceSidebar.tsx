import React from 'react';
import DashboardServiceEndpointsTree
    from "@packages/dashboardService/containers/endpoints/DashboardServiceEndpointsTree";
import Stack from '@mui/material/Stack';
import ImportOsSystemRequestsLogsBtn
    from "@packages/dashboardService/containers/importOsSystemRequestLogs/ImportOsSystemRequestsLogsBtn";
import Divider from '@mui/material/Divider';
import {SxStyle} from "@baseTypes/sx";
import Box from '@mui/material/Box';

const sx:SxStyle = {
    inner:{
        padding:'0 10px'
    }
}
const DashboardServiceSidebar = () => {
    return (
        <Stack
            gap={1}
        >
            <Divider/>

            <Box
                sx={sx.inner}
            >
                <ImportOsSystemRequestsLogsBtn/>
            </Box>

            <DashboardServiceEndpointsTree/>
        </Stack>
    );
};

export default DashboardServiceSidebar;