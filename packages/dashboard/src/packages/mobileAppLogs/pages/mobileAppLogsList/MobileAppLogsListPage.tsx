import React from 'react';
import Stack from "@mui/material/Stack";
import {sx} from './sx'
import MobileAppLogsList from "@packages/mobileAppLogs/containers/mobileAppLogs/list/MobileAppLogsList";


const MobileAppLogsListPage = () => {


    return (
        <Stack
            sx={sx.root}
        >
            <MobileAppLogsList/>
        </Stack>
    );
};

export default MobileAppLogsListPage;
