import {ServerLog} from "@containers/serverLogs/types";
import {Stack} from "@mui/material";
import LineNumber from "@containers/serverLogs/logItem/LineNumber";
import LogText from "@containers/serverLogs/logItem/LogText";

interface Prop {
    serverLog: ServerLog
}

const LogItem = ({serverLog}: Prop) => {
    return (
        <Stack
            gap={1}
            direction={'row'}
        >
            <LineNumber
                lineNumber={serverLog.lineNumber}
            />

            <LogText
                log={serverLog.log}
            />
        </Stack>
    );
};

export default LogItem;
