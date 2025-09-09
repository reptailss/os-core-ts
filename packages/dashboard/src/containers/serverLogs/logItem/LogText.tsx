import React from 'react';
import {sx} from "@containers/serverLogs/logItem/sx";
import {Box} from "@mui/material";
import { formatLogMessages } from './helpers/formatLogMessages';

interface Props {
    log: string
}

const LogText = ({log}: Props) => {
    return (
        <Box
            sx={sx.log}
            dangerouslySetInnerHTML={{
                __html: formatLogMessages(log)
            }}
        />
    );
};

export default LogText;
