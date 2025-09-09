import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import {SystemOsLog} from "@packages/systemStatus/containers/osInfoLogs/types";


interface HeadCell {
    disablePadding: boolean;
    id: keyof SystemOsLog;
    label: string;
    numeric: boolean;
    disableSort?: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'date',
    },
    {
        id: 'service_key',
        numeric: false,
        disablePadding: false,
        label: 'service',
    },
    {
        id: 'sys_name',
        numeric: false,
        disablePadding: false,
        label: 'sys name',
    },
    {
        id: 'sys_ips',
        numeric: false,
        disablePadding: false,
        label: 'sys ips',
        disableSort: true
    },
    {
        id: 'sys_machine',
        numeric: true,
        disablePadding: false,
        label: 'sys machine',
    },
    {
        id: 'cpu_model',
        numeric: true,
        disablePadding: false,
        label: 'cpu model',
    },
    {
        id: 'cpu_cores',
        numeric: false,
        disablePadding: false,
        label: 'cpu cores',
    },
    {
        id: 'cpu_speed',
        numeric: false,
        disablePadding: false,
        label: 'cpu speed',
    },
    {
        id: 'cpu_os_used',
        numeric: false,
        disablePadding: false,
        label: 'cpu os used',
    },
    {
        id: 'cpu_pr_used',
        numeric: false,
        disablePadding: false,
        label: 'cpu pr used',
    },
    {
        id: 'ram_os_total',
        numeric: true,
        disablePadding: false,
        label: 'ram os total',
    },
    {
        id: 'ram_os_free',
        numeric: false,
        disablePadding: false,
        label: 'ram os free',
    },
    {
        id: 'ram_os_used',
        numeric: false,
        disablePadding: false,
        label: 'ram os used',
    },
    {
        id: 'ram_pr_used',
        numeric: true,
        disablePadding: false,
        label: 'ram pr used',
    },
];

export function SystemOsLogsTableHead(props: {
    onChangeSort: (props: {
        order: 'desc' | 'asc',
        orderBy: keyof SystemOsLog
    }) => void,
    order: 'asc' | 'desc';
    orderBy: string;
    rowCount: number;
}) {
    const {
        order,
        orderBy,
        onChangeSort
    } = props;
    const createSortHandler = (property: keyof SystemOsLog) => {
        onChangeSort({
            order,
            orderBy: property,
        })
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell?.disableSort ? headCell.label : <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={() => createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>}

                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
