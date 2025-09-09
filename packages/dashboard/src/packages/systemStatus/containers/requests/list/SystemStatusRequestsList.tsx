import React from 'react';
import {useGetRequestsListState} from "@containers/requests/requestsState/hooks/useGetRequestsListState";
import RequestsListView from "@containers/requests/requestsList/RequestsListView";
import SystemStatusSidebarRequestList
    from "@packages/systemStatus/containers/requests/sidebar/SystemStatusSidebarRequestList";
import {useGetSystemStatusRequests} from "@packages/systemStatus/containers/requests/hooks/useGetSystemStatusRequests";
import Grid2 from '@mui/material/Grid2';
import {sx} from './sx'
import Spinner from "@ui/spinner/Spinner";
import {ServerMeta} from "@containers/requests/types/meta";

const SystemStatusRequestsList = () => {

    const requestsListState = useGetRequestsListState()

    const {
        requests,
        totalPage,
        getRequests,
        isLoading
    } = useGetSystemStatusRequests()

    const onChangeSort = ({
                              order,
                              orderBy,
                          }: {
        order: 'desc' | 'asc',
        orderBy: keyof ServerMeta
    }) => {
        getRequests({
            order,
            orderBy,
            dateStart: requestsListState.dateStart,
            dateEnd: requestsListState.dateEnd,
            statusCodes: requestsListState.statusCodes,
            targetEndpoints: requestsListState.targetEndpoints,
            errorCodes: requestsListState.errorCodes,
            errorStatus: requestsListState.errorStatus,
            page: requestsListState.page,
            perPage: requestsListState.perPage,
        })
    }

    const onChangePage = (page: number) => {
        getRequests({
            order: requestsListState.order,
            orderBy: requestsListState.orderBy,
            dateStart: requestsListState.dateStart,
            dateEnd: requestsListState.dateEnd,
            statusCodes: requestsListState.statusCodes,
            targetEndpoints: requestsListState.targetEndpoints,
            errorCodes: requestsListState.errorCodes,
            errorStatus: requestsListState.errorStatus,
            page,
            perPage: requestsListState.perPage,
        })
    }

    return (
        <>
            {isLoading && <Spinner variant={'overlay'}/>}

            <Grid2
                container
                spacing={1}
            >
                <Grid2
                    size={9}
                >
                    <RequestsListView
                        isLoading={isLoading}
                        requestsListState={requestsListState}
                        requests={requests}
                        totalPage={totalPage}
                        sxTable={sx.table}
                        onChangeSort={onChangeSort}
                        onChangePage={onChangePage}
                    />
                </Grid2>

                <Grid2
                    size={3}
                    sx={sx.sidebar}
                >
                    <SystemStatusSidebarRequestList
                        requestsListState={requestsListState}
                        getRequests={getRequests}
                    />
                </Grid2>
            </Grid2>
        </>
    );
};

export default SystemStatusRequestsList;

