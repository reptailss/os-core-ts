import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import {MobileAppLog} from "@packages/mobileAppLogs/containers/mobileAppLogs/types";
import {MOBILE_APP_LOG_CELLS} from "@packages/mobileAppLogs/containers/mobileAppLogs/list/view/constants/cells";



export function TableHeadMobileAppLogsList(props: {
    onChangeSort: (props: {
        order: 'desc' | 'asc',
        orderBy: keyof MobileAppLog
    }) => void,
    order: 'asc' | 'desc';
    orderBy: string | null
    rowCount: number
}) {
    const {
        order,
        orderBy,
        onChangeSort
    } = props;
    const createSortHandler = (property: keyof MobileAppLog) => {
        onChangeSort({
            order,
            orderBy: property,
        })
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell
                    key={'info'}
                >
                
                </TableCell>
                {MOBILE_APP_LOG_CELLS.map((headCell) => (
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
