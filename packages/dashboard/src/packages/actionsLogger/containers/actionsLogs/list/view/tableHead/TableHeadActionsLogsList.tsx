import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import {ActionLog} from "@packages/actionsLogger/containers/actionsLogs/types";


interface HeadCell {
    disablePadding: boolean;
    id: keyof ActionLog;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'date_add',
        numeric: false,
        disablePadding: false,
        label: 'Час запиту',
    },
    {
        id: 'service_key',
        numeric: false,
        disablePadding: false,
        label: 'Сервіс',
    },
    {
        id: 'action',
        numeric: true,
        disablePadding: false,
        label: 'Тип дії',
    },
    {
        id: 'db_type',
        numeric: true,
        disablePadding: false,
        label: 'Тип бд',
    },
    {
        id: 'database',
        numeric: true,
        disablePadding: false,
        label: 'Назва бд',
    },
    {
        id: 'table',
        numeric: true,
        disablePadding: false,
        label: 'Назва таблиці',
    },
    {
        id: 'row_id',
        numeric: true,
        disablePadding: false,
        label: 'Рядок',
    },
    {
        id: 'open_user_id',
        numeric: true,
        disablePadding: false,
        label: 'Юзер id',
    }
];

export function TableHeadActionsLogsList(props: {
    onChangeSort: (props: {
        order: 'desc' | 'asc',
        orderBy: keyof ActionLog
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
    const createSortHandler = (property: keyof ActionLog) => {
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
                        <TableSortLabel
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
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
