import React from 'react';
import Stack from "@mui/material/Stack";
import {sx} from './sx'
import DashboardServiceRequestsList from "@packages/dashboardService/containers/requests/DashboardServiceRequestsList";


const DashboardServiceRequestListPage = () => {

    return (
        <Stack
            sx={sx.root}
        >
            <DashboardServiceRequestsList/>
        </Stack>
    );
};

export default DashboardServiceRequestListPage;
