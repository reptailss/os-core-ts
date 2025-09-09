import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import {GlobalServiceEndpoints} from "@packages/access/containers/globalServiceEndpoints/types";


interface HeadCell {
    disablePadding: boolean;
    id: keyof GlobalServiceEndpoints;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'service_key',
        numeric: false,
        disablePadding: false,
        label: 'Сервіс',
    },
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'Тип',
    },
    {
        id: 'endpoints',
        numeric: false,
        disablePadding: false,
        label: 'Ендпоінти',
    },
];

export function TableHeadGlobalServiceEndpointsList(props: {
    onChangeSort: (props: {
        order: 'desc' | 'asc',
        orderBy: keyof GlobalServiceEndpoints
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
    const createSortHandler = (property: keyof GlobalServiceEndpoints) => {
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
