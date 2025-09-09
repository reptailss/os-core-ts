import * as React from 'react';
import {ReactNode} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import {TableHeadRequestsList} from "./TableHeadRequestsList";
import {sx} from './sx'
import {Pagination} from '@mui/material';
import RequestInfo from "./RequestInfo";
import {addQueryParamsWithoutRouter} from "@helpers/searchParams";
import NotFoundMessage from "@ui/notFoundMesssage/NotFoundMessage";
import {TransformServerMeta} from "@containers/requests/types/transform";
import {RequestsListState} from "@containers/requests/requestsState/types";
import RequestListItem from "@containers/requests/requestsList/requestListItem/RequestListItem";
import {ServerMeta} from "@containers/requests/types/meta";
import {SxStyle} from "@baseTypes/sx";


interface Props {
    requestsListState: RequestsListState,
    requests: TransformServerMeta[]
    isLoading?: boolean
    totalPage: number
    children?: ReactNode,
    sxTable?: SxStyle,
    onChangeSort?: (props: {
        order: 'desc' | 'asc',
        orderBy: keyof ServerMeta
    }) => void,
    onChangePage?: (page: number) => void
}

export default function RequestsListView({
                                             requestsListState,
                                             requests,
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
        orderBy: keyof ServerMeta
    }) => {
        const newOrder = requestsListState.orderBy === orderBy ? (order === 'asc' ? 'desc' : 'asc') : order;
        requestsListState.setOrder(newOrder);
        requestsListState.setOrderBy(orderBy);
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
        requestsListState.setPage(newPage);
        addQueryParamsWithoutRouter({
            page: newPage.toString()
        })
        if (onChangePage) {
            onChangePage(newPage);
        }
    };
    const onClick = (targetRequest: TransformServerMeta) => {
        requestsListState.setTargetRequest(targetRequest)
        requestsListState.setOpenModal(true)
    }

    return (
        <Box
            sx={sx.root}
        >
            <RequestInfo
                targetRequest={requestsListState.targetRequest}
                open={requestsListState.openModal}
                setOpen={requestsListState.setOpenModal}
            />

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
                        <TableHeadRequestsList
                            order={requestsListState.order}
                            orderBy={requestsListState.orderBy}
                            onChangeSort={handleChangeSort}
                            rowCount={requests?.length}
                        />

                        <TableBody>
                            {requests?.map((request) => {
                                return (
                                    <RequestListItem
                                        request={request}
                                        key={request.__id}
                                        onClick={onClick}
                                    />
                                );
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>

                {(!requests?.length && !isLoading) && <NotFoundMessage/>}

                {(totalPage > 1) && <Pagination
                    count={totalPage}
                    page={requestsListState.page > totalPage ? totalPage : requestsListState.page}
                    onChange={handleChangePage}
                    variant="outlined"
                    shape="rounded"
                    sx={sx.pagination}
                />}
            </Paper>
        </Box>
    );
}
