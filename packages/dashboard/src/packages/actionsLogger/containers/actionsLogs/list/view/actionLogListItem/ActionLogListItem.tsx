import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import {SxStyle} from "@baseTypes/sx";
import {ActionLog} from "@packages/actionsLogger/containers/actionsLogs/types";
import moment from "moment/moment";


const sx: SxStyle = {
    date: {
        whiteSpace: 'nowrap',
        position: 'sticky',
        left: '0',
        backgroundColor: '#121212',
        width: '170px',
    },
    service: {
        position: 'sticky',
        left: '170px',
        backgroundColor: '#121212',
    },
    endpoint: {
        whiteSpace: 'nowrap'
    }
}

interface Props {
    onClick: (actionLog: ActionLog) => void,
    actionLog: ActionLog
}

const ActionLogListItem = ({
                               onClick,
                               actionLog,
                           }: Props) => {
    return (
        <TableRow
            hover
            tabIndex={-1}
        >
            <TableCell
                sx={sx.date}
            >
                <IconButton
                    onClick={() => onClick(actionLog)}
                >
                    <InfoIcon/>
                </IconButton>

                {moment(actionLog.date_add).format("DD-MM-YYYY HH:mm:ss")}
            </TableCell>

            <TableCell
                sx={sx.service}
            >
                {actionLog.service_key}
            </TableCell>

            <TableCell
                align={'right'}
            >
                {actionLog.action}
            </TableCell>

            <TableCell
                align={'right'}
            >
                {actionLog.db_type}
            </TableCell>

            <TableCell
                align={'right'}
            >
                {actionLog.database}
            </TableCell>

            <TableCell align="right">
                {actionLog.table}
            </TableCell>

            <TableCell
                align={'right'}
            >
                {actionLog.row_id}
            </TableCell>

            <TableCell
                align={'right'}
            >
                {actionLog.open_user_id}
            </TableCell>

        </TableRow>
    );
};

export default ActionLogListItem;