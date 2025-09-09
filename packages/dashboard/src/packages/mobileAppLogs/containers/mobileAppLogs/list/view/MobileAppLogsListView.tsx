import * as React from 'react';
import {ReactNode} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import {sx} from './sx'
import {Pagination} from '@mui/material';
import {addQueryParamsWithoutRouter} from "@helpers/searchParams";
import NotFoundMessage from "@ui/notFoundMesssage/NotFoundMessage";
import {MobileAppLog} from "@packages/mobileAppLogs/containers/mobileAppLogs/types";
import {MobileAppLogsListState} from "@packages/mobileAppLogs/containers/mobileAppLogs/list/types/state";

import {
    TableHeadMobileAppLogsList
} from "@packages/mobileAppLogs/containers/mobileAppLogs/list/view/tableHead/TableHeadMobileAppLogsList";
import MobileAppLogListItem
    from "@packages/mobileAppLogs/containers/mobileAppLogs/list/view/mobileAppLogListItem/MobileAppLogListItem";
import MobileAppLogInfo
    from "@packages/mobileAppLogs/containers/mobileAppLogs/list/view/mobileAppLogInfo/MobileAppLogInfo";



interface Props {
    mobileAppLogsListState: MobileAppLogsListState
    mobileAppLogs: MobileAppLog[]
    isLoading?: boolean
    totalPage: number
    children?: ReactNode
    onChangeSort?: (props: {
        order: 'desc' | 'asc',
        orderBy: keyof MobileAppLog
    }) => void
    onChangePage?: (page: number) => void
}

export default function MobileAppLogsListView({
                                                mobileAppLogsListState,
                                                mobileAppLogs,
                                                isLoading,
                                                totalPage,
                                                children,
                                                onChangeSort,
                                                onChangePage,
                                            }: Props) {

    const handleChangeSort = ({
                                  order,
                                  orderBy
                              }: {
        order: 'desc' | 'asc',
        orderBy: keyof MobileAppLog
    }) => {
        const newOrder = mobileAppLogsListState.orderBy === orderBy ? (order === 'asc' ? 'desc' : 'asc') : order;
        mobileAppLogsListState.setOrder(newOrder);
        mobileAppLogsListState.setOrderBy(orderBy);
        if (onChangeSort) {
            onChangeSort({
                order: newOrder,
                orderBy,
            })
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        mobileAppLogsListState.setPage(newPage);
        addQueryParamsWithoutRouter({
            page: newPage.toString()
        })
        if (onChangePage) {
            onChangePage(newPage);
        }
    };
    const onClick = (mobileAppLog: MobileAppLog) => {
        mobileAppLogsListState.setTargetMobileAppLog(mobileAppLog)
        mobileAppLogsListState.setOpenModal(true)
    }

    return (
        <Box
            sx={sx.root}
        >
            <MobileAppLogInfo
                targetMobileAppLog={mobileAppLogsListState.targetMobileAppLog}
                open={mobileAppLogsListState.openModal}
                setOpen={mobileAppLogsListState.setOpenModal}
            />

            {children && children}

            <Paper
                sx={sx.paper}
            >
                <TableContainer
                    sx={sx.table}
                >
                    <Table
                        size={'small'}
                        stickyHeader
                    >
                        <TableHeadMobileAppLogsList
                            order={mobileAppLogsListState.order}
                            orderBy={mobileAppLogsListState.orderBy}
                            onChangeSort={handleChangeSort}
                            rowCount={mobileAppLogs?.length}
                        />

                        <TableBody>
                            {mobileAppLogs?.map((mobileAppLog) => {
                                return (
                                    <MobileAppLogListItem
                                        mobileAppLog={mobileAppLog}
                                        key={mobileAppLog._id}
                                        onClick={onClick}
                                    />
                                );
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>

                {(!mobileAppLogs?.length && !isLoading) && <NotFoundMessage/>}

                {(totalPage > 1) && <Pagination
                    count={totalPage}
                    page={mobileAppLogsListState.page > totalPage ? totalPage : mobileAppLogsListState.page}
                    onChange={handleChangePage}
                    variant="outlined"
                    shape="rounded"
                    sx={sx.pagination}
                />}
            </Paper>
        </Box>
    );
}
