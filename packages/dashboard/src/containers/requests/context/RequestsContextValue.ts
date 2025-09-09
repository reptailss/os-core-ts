import React from "react";
import {RequestsContext} from "@containers/requests/context/types";


export const RequestsContextValue = React.createContext<RequestsContext>({
    isLoadingRequests: true,
    refetchRequests: async () => {
    },
    requests: [],
    requestsGroupedByStatus: [],
    endpointPaths: [],
    endpointsTree: [],
    targetEndpoints: [],
    setTargetEndpoints: () => {
    },
    requestsGroupedByEndpoints: {
        groupedRequests: [],
        grandTotal: 0,
        overallAverageResponseTime: 0,
        allDays: []
    },
    requestsGroupedByErrorCode: [],
})