import * as React from 'react';
import {ReactNode} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import {SystemOsLogsTableHead} from "./SystemOsLogsTableHead";
import {sx} from './sx'
import {Pagination} from '@mui/material';
import {addQueryParamsWithoutRouter} from "@helpers/searchParams";
import NotFoundMessage from "@ui/notFoundMesssage/NotFoundMessage";
import {SxStyle} from "@baseTypes/sx";
import {SystemOsLog} from "@packages/systemStatus/containers/osInfoLogs/types";
import {SystemOsLogsListState} from "@packages/systemStatus/containers/osInfoLogs/systemStatusOsLogsListState/types";
import SystemOsLogsListItem
    from "@packages/systemStatus/containers/osInfoLogs/view/osInfoListItem/SystemOsLogsListItem";


interface Props {
    systemOsLogsListState: SystemOsLogsListState,
    systemOsLogs: SystemOsLog[]
    isLoading?: boolean
    totalPage: number
    children?: ReactNode,
    sxTable?: SxStyle,
    onChangeSort?: (props: {
        order: 'desc' | 'asc',
        orderBy: keyof SystemOsLog
    }) => void,
    onChangePage?: (page: number) => void
}

export default function SystemOsLogsListView({
                                                 systemOsLogsListState,
                                                 systemOsLogs,
                                                 isLoading,
                                                 totalPage,
                                                 children,
                                                 sxTable,
                                                 onChangeSort,
                                                 onChangePage,
                                             }: Props) {

    const handleChangeSort = ({
                                  order,
                                  orderBy
                              }: {
        order: 'desc' | 'asc',
        orderBy: keyof SystemOsLog
    }) => {
        const newOrder = systemOsLogsListState.orderBy === orderBy ? (order === 'asc' ? 'desc' : 'asc') : order;
        systemOsLogsListState.setOrder(newOrder);
        systemOsLogsListState.setOrderBy(orderBy);
        addQueryParamsWithoutRouter({
            order: newOrder,
            orderBy,
        })
        if (onChangeSort) {
            onChangeSort({
                order: newOrder,
                orderBy,
            })
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        systemOsLogsListState.setPage(newPage);
        addQueryParamsWithoutRouter({
            page: newPage.toString()
        })
        if (onChangePage) {
            onChangePage(newPage);
        }
    };

    return (
        <Box
            sx={sx.root}
        >
            {children && children}

            <Paper
                sx={sx.paper}
            >
                <TableContainer
                    sx={sxTable || sx.table}
                >
                    <Table
                        size={'small'}
                        stickyHeader
                    >
                        <SystemOsLogsTableHead
                            order={systemOsLogsListState.order}
                            orderBy={systemOsLogsListState.orderBy}
                            onChangeSort={handleChangeSort}
                            rowCount={systemOsLogs?.length}
                        />

                        <TableBody>
                            {systemOsLogs?.map((systemOsLog) => {
                                return (
                                    <SystemOsLogsListItem
                                        systemOsLog={systemOsLog}
                                        key={systemOsLog._id}
                                    />
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                {(!systemOsLogs?.length && !isLoading) && <NotFoundMessage/>}

                {(totalPage > 1) && <Pagination
                    count={totalPage}
                    page={systemOsLogsListState.page > totalPage ? totalPage : systemOsLogsListState.page}
                    onChange={handleChangePage}
                    variant="outlined"
                    shape="rounded"
                    sx={sx.pagination}
                />}
            </Paper>
        </Box>
    );
}
