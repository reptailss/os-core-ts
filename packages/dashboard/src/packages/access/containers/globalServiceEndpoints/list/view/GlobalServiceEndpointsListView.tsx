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
import {GlobalServiceEndpoints} from "@packages/access/containers/globalServiceEndpoints/types";
import {GlobalServiceEndpointsListState} from "@packages/access/containers/globalServiceEndpoints/list/types/state";
import GlobalServiceEndpointsInfo
    from "@packages/access/containers/globalServiceEndpoints/list/view/globalServiceEndpointsInfo/GlobalServiceEndpointsInfo";
import {
    TableHeadGlobalServiceEndpointsList
} from "@packages/access/containers/globalServiceEndpoints/list/view/tableHead/TableHeadGlobalServiceEndpointsList";
import GlobalServiceEndpointsItem
    from "@packages/access/containers/globalServiceEndpoints/list/view/actionLogListItem/GlobalServiceEndpointsItem";


interface Props {
    globalServiceEndpointsListState: GlobalServiceEndpointsListState
    globalServiceEndpointsList: GlobalServiceEndpoints[]
    isLoading?: boolean
    totalPage: number
    children?: ReactNode
    onChangeSort?: (props: {
        order: 'desc' | 'asc',
        orderBy: keyof GlobalServiceEndpoints
    }) => void
    onChangePage?: (page: number) => void
    onDeleteServiceEndpoints: (globalServiceEndpoints: GlobalServiceEndpoints) => Promise<void>
    onDeleteServiceEndpoint: (globalServiceEndpoint: {
        serviceKey: string
        endpoint: string
    }) => Promise<void>
}

export default function GlobalServiceEndpointsListView({
                                                           globalServiceEndpointsListState,
                                                           globalServiceEndpointsList,
                                                           isLoading,
                                                           totalPage,
                                                           children,
                                                           onChangeSort,
                                                           onChangePage,
                                                           onDeleteServiceEndpoints,
                                                           onDeleteServiceEndpoint,
                                                       }: Props) {

    const handleChangeSort = ({
                                  order,
                                  orderBy
                              }: {
        order: 'desc' | 'asc',
        orderBy: keyof GlobalServiceEndpoints
    }) => {
        const newOrder = globalServiceEndpointsListState.orderBy === orderBy ? (order === 'asc' ? 'desc' : 'asc') : order;
        globalServiceEndpointsListState.setOrder(newOrder);
        globalServiceEndpointsListState.setOrderBy(orderBy);
        if (onChangeSort) {
            onChangeSort({
                order: newOrder,
                orderBy,
            })
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        globalServiceEndpointsListState.setPage(newPage);
        addQueryParamsWithoutRouter({
            page: newPage.toString()
        })
        if (onChangePage) {
            onChangePage(newPage);
        }
    };
    const onClick = (globalServiceEndpoints: GlobalServiceEndpoints) => {
        globalServiceEndpointsListState.setTargetGlobalServiceEndpoints(globalServiceEndpoints)
        globalServiceEndpointsListState.setOpenModal(true)
    }

    return (
        <Box
            sx={sx.root}
        >
            <GlobalServiceEndpointsInfo
                targetGlobalServiceEndpoints={globalServiceEndpointsListState.targetGlobalServiceEndpoints}
                open={globalServiceEndpointsListState.openModal}
                setOpen={globalServiceEndpointsListState.setOpenModal}
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
                        <TableHeadGlobalServiceEndpointsList
                            order={globalServiceEndpointsListState.order}
                            orderBy={globalServiceEndpointsListState.orderBy}
                            onChangeSort={handleChangeSort}
                            rowCount={globalServiceEndpointsList?.length}
                        />

                        <TableBody>
                            {globalServiceEndpointsList?.map((globalServiceEndpoints) => {
                                return (
                                    <GlobalServiceEndpointsItem
                                        globalServiceEndpoints={globalServiceEndpoints}
                                        key={globalServiceEndpoints.id}
                                        onClick={onClick}
                                        onDeleteServiceEndpoints={onDeleteServiceEndpoints}
                                        onDeleteServiceEndpoint={onDeleteServiceEndpoint}
                                    />
                                );
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>

                {(!globalServiceEndpointsList?.length && !isLoading) && <NotFoundMessage/>}

                {(totalPage > 1) && <Pagination
                    count={totalPage}
                    page={globalServiceEndpointsListState.page > totalPage ? totalPage : globalServiceEndpointsListState.page}
                    onChange={handleChangePage}
                    variant="outlined"
                    shape="rounded"
                    sx={sx.pagination}
                />}
            </Paper>
        </Box>
    );
}
