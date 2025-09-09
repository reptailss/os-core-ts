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
import {ActionLog} from "@packages/actionsLogger/containers/actionsLogs/types";
import {ActionsLogsListState} from "@packages/actionsLogger/containers/actionsLogs/list/types/state";
import ActionLogListItem
    from "@packages/actionsLogger/containers/actionsLogs/list/view/actionLogListItem/ActionLogListItem";
import {
    TableHeadActionsLogsList
} from "@packages/actionsLogger/containers/actionsLogs/list/view/tableHead/TableHeadActionsLogsList";
import ActionLogInfo from "@packages/actionsLogger/containers/actionsLogs/list/view/actionLogInfo/ActionLogInfo";


interface Props {
    actionsLogsListState: ActionsLogsListState
    actionsLogs: ActionLog[]
    isLoading?: boolean
    totalPage: number
    children?: ReactNode
    onChangeSort?: (props: {
        order: 'desc' | 'asc',
        orderBy: keyof ActionLog
    }) => void
    onChangePage?: (page: number) => void
}

export default function ActionsLogsListView({
                                                actionsLogsListState,
                                                actionsLogs,
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
        orderBy: keyof ActionLog
    }) => {
        const newOrder = actionsLogsListState.orderBy === orderBy ? (order === 'asc' ? 'desc' : 'asc') : order;
        actionsLogsListState.setOrder(newOrder);
        actionsLogsListState.setOrderBy(orderBy);
        if (onChangeSort) {
            onChangeSort({
                order: newOrder,
                orderBy,
            })
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        actionsLogsListState.setPage(newPage);
        addQueryParamsWithoutRouter({
            page: newPage.toString()
        })
        if (onChangePage) {
            onChangePage(newPage);
        }
    };
    const onClick = (actionLog: ActionLog) => {
        actionsLogsListState.setTargetActionLog(actionLog)
        actionsLogsListState.setOpenModal(true)
    }

    return (
        <Box
            sx={sx.root}
        >
            <ActionLogInfo
                targetActionLog={actionsLogsListState.targetActionLog}
                open={actionsLogsListState.openModal}
                setOpen={actionsLogsListState.setOpenModal}
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
                        <TableHeadActionsLogsList
                            order={actionsLogsListState.order}
                            orderBy={actionsLogsListState.orderBy}
                            onChangeSort={handleChangeSort}
                            rowCount={actionsLogs?.length}
                        />

                        <TableBody>
                            {actionsLogs?.map((actionLog) => {
                                return (
                                    <ActionLogListItem
                                        actionLog={actionLog}
                                        key={actionLog._id}
                                        onClick={onClick}
                                    />
                                );
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>

                {(!actionsLogs?.length && !isLoading) && <NotFoundMessage/>}

                {(totalPage > 1) && <Pagination
                    count={totalPage}
                    page={actionsLogsListState.page > totalPage ? totalPage : actionsLogsListState.page}
                    onChange={handleChangePage}
                    variant="outlined"
                    shape="rounded"
                    sx={sx.pagination}
                />}
            </Paper>
        </Box>
    );
}
