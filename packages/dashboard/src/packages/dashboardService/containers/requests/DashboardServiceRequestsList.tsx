import React from 'react';
import {useRequestsContext} from "@containers/requests/context/hooks/useRequestsContext";
import {useRequestsClientPagination} from "@containers/requests/hooks/useRequestsClientPagination";
import {useGetRequestsListState} from "@containers/requests/requestsState/hooks/useGetRequestsListState";
import RequestsListView from "@containers/requests/requestsList/RequestsListView";
import DashboardServiceHeadSidebarRequestList
    from "@packages/dashboardService/containers/requests/headSidebar/DashboardServiceHeadSidebarRequestList";
const DashboardServiceRequestsList = () => {

    const {requests, isLoadingRequests} = useRequestsContext()
    const requestsListState = useGetRequestsListState()
    const {
        totalPage,
        paginationData,
    } = useRequestsClientPagination({
        requests,
        requestsListState
    })

    return (
        <RequestsListView
            totalPage={totalPage}
            isLoading={isLoadingRequests}
            requestsListState={requestsListState}
            requests={paginationData}
        >
            <DashboardServiceHeadSidebarRequestList
                requestsListState={requestsListState}
            />
        </RequestsListView>
    );
};

export default DashboardServiceRequestsList;