import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {SxStyle} from "@baseTypes/sx";
import {SystemOsLog} from "@packages/systemStatus/containers/osInfoLogs/types";
import moment from 'moment'

const sx: SxStyle = {
    date: {
        whiteSpace: 'nowrap',
        position: 'sticky',
        left: '0',
        backgroundColor: '#121212',
        width: '150px',
    },
    service: {
        position: 'sticky',
        left: '150px',
        backgroundColor: '#121212',
    },
    endpoint: {
        whiteSpace: 'nowrap'
    }
}

interface Props {
    systemOsLog: SystemOsLog
}

const SystemOsLogsListItem = ({
                                  systemOsLog,
                              }: Props) => {
    return (
        <TableRow
            hover
            tabIndex={-1}
        >
            <TableCell
                sx={sx.date}
            >
                {moment(systemOsLog.date).format("YYYY-MM-DD HH:mm:ss")}
            </TableCell>

            <TableCell
                sx={sx.service}
            >
                {systemOsLog.service_key}
            </TableCell>

            <TableCell>
                {systemOsLog.sys_name}
            </TableCell>

            <TableCell
            >
                {systemOsLog.sys_ips.join(',')}
            </TableCell>


            <TableCell>
                {systemOsLog.sys_machine}
            </TableCell>

            <TableCell>
                {systemOsLog.cpu_model}
            </TableCell>

            <TableCell
                align="right"
            >
                {systemOsLog.cpu_cores}
            </TableCell>

            <TableCell
                align="right"
            >
                {systemOsLog.cpu_speed}
            </TableCell>

            <TableCell align="right">
                {systemOsLog.cpu_os_used}
            </TableCell>

            <TableCell align="right">
                {systemOsLog.cpu_pr_used}
            </TableCell>

            <TableCell align="right">
                {systemOsLog.ram_os_total}
            </TableCell>

            <TableCell align="right">
                {systemOsLog.ram_os_free}
            </TableCell>

            <TableCell align="right">
                {systemOsLog.ram_os_used}
            </TableCell>

            <TableCell align="right">
                {systemOsLog.ram_pr_used}
            </TableCell>
        </TableRow>
    );
};

export default SystemOsLogsListItem;