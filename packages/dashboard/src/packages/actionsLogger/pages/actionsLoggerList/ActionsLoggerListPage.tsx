import React from 'react';
import Stack from "@mui/material/Stack";
import {sx} from './sx'
import ActionsLogsList from "@packages/actionsLogger/containers/actionsLogs/list/ActionsLogsList";


const ActionsLoggerListPage = () => {


    return (
        <Stack
            sx={sx.root}
        >
            <ActionsLogsList/>
        </Stack>
    );
};

export default ActionsLoggerListPage;
