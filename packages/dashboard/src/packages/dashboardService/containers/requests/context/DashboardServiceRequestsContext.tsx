import RequestsContextProvider from '@containers/requests/context/RequestsContextProvider';
import React, {ReactNode} from 'react';
import {useGetRequestState} from "@containers/requests/requestsState/hooks/useGetRequestState";
import {getRequestsInitialDate} from "@containers/requests/date/getRequestsInitialDate";
import {
    useGetDashboardServiceRequests
} from "@packages/dashboardService/containers/requests/hooks/useGetDashboardServiceRequests";
import {
    useGetDashboardServiceRequestsFiltersByTargetEndpoints
} from "@packages/dashboardService/containers/requests/hooks/useGetDashboardServiceRequestsFiltersByTargetEndpoints";


const {
    initialDateStart,
    initialDateEnd,
} = getRequestsInitialDate()


interface Props {
    children: ReactNode
}

const DashboardServiceRequestsContext = ({
                                             children
                                         }: Props) => {

    const requestsState = useGetRequestState({
        initialDateStart, initialDateEnd
    })


    const {
        refetch,
        requests,
        endpointPaths,
        isLoading,
        endpointsTree,
    } = useGetDashboardServiceRequests({setTargetEndpoints: requestsState.setTargetEndpoints})

    const targetRequests = useGetDashboardServiceRequestsFiltersByTargetEndpoints({
        requests,
        targetEndpoints: requestsState.targetEndpoints,
        endpointPaths
    })
    return (
        <RequestsContextProvider
            requestsState={requestsState}
            requests={targetRequests}
            refetch={refetch}
            endpointPaths={endpointPaths}
            isLoading={isLoading}
            endpointsTree={endpointsTree}
        >
            {children}
        </RequestsContextProvider>
    );
};

export default DashboardServiceRequestsContext;