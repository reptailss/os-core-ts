import React, {ReactNode} from 'react'
import {useGetRequestsGroupedByEndpoints} from "@containers/requests/hooks/useGetRequestsGroupedByEndpoints";
import Spinner from "@ui/spinner/Spinner";
import {
    useGetRequestsGroupedByStatusAndErrorCode
} from "@containers/requests/hooks/useGetRequestsGroupedByStatusAndErrorCode";
import {TransformServerMeta} from "@containers/requests/types/transform";
import {RequestsContextValue} from '@containers/requests/context/RequestsContextValue';
import {RequestsState} from "@containers/requests/requestsState/types";
import {EndpointNode} from "@containers/requests/types/endpoint";


interface IProps {
    children: ReactNode
    requestsState: RequestsState
    isLoading: boolean,
    requests: TransformServerMeta[],
    refetch: () => Promise<void>,
    endpointPaths: string[],
    endpointsTree: EndpointNode[],
    totalPage?: number
}


const RequestsContextProvider = ({
                                     children,
                                     requestsState,
                                     refetch,
                                     requests,
                                     endpointPaths,
                                     isLoading,
                                     endpointsTree,
                                     totalPage,
                                 }: IProps) => {

    const requestsGroupedByEndpoints = useGetRequestsGroupedByEndpoints(requests)

    const {
        requestsGroupedByStatus,
        requestsGroupedByErrorCode,
    } = useGetRequestsGroupedByStatusAndErrorCode(requests)

    return (
        <RequestsContextValue.Provider value={{
            requests,
            refetchRequests: refetch,
            isLoadingRequests: isLoading,
            requestsGroupedByStatus,
            endpointPaths,
            endpointsTree,
            targetEndpoints: requestsState.targetEndpoints,
            setTargetEndpoints: requestsState.setTargetEndpoints,
            requestsGroupedByEndpoints,
            requestsGroupedByErrorCode,
            totalPage,
        }}
        >
            {isLoading && <Spinner variant={'overlay'}/>}

            {children}
        </RequestsContextValue.Provider>
    );
};

export default RequestsContextProvider;
