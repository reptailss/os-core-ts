import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import {ServerMeta} from "@containers/requests/types/meta";


interface HeadCell {
    disablePadding: boolean;
    id: keyof ServerMeta;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'date',
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
        id: 'route_path',
        numeric: true,
        disablePadding: false,
        label: 'Ендпоінт',
    },
    {
        id: 'response_status_code',
        numeric: true,
        disablePadding: false,
        label: 'Статус',
    },
    {
        id: 'error',
        numeric: false,
        disablePadding: false,
        label: 'Помилка',
    },
    {
        id: 'error_code',
        numeric: false,
        disablePadding: false,
        label: 'Ключ помилки',
    },
    {
        id: 'is_system',
        numeric: false,
        disablePadding: false,
        label: 'Системний',
    },
    {
        id: 'open_user_id',
        numeric: false,
        disablePadding: false,
        label: 'userId',
    },
    {
        id: 'response_time',
        numeric: true,
        disablePadding: false,
        label: 'Час виконання',
    },
];

export function TableHeadRequestsList(props: {
    onChangeSort: (props: {
        order: 'desc' | 'asc',
        orderBy: keyof ServerMeta
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
    const createSortHandler = (property: keyof ServerMeta) => {
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
