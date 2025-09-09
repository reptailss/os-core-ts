import React from 'react';
import {useRequestsContext} from "@containers/requests/context/hooks/useRequestsContext";
import EndpointsTreeViewWithLocalState from "@containers/requests/endpointsTree/EndpointsTreeViewWithLocalState";

const DashboardServiceEndpointsTree = () => {

    const {
        endpointsTree,
        targetEndpoints,
        setTargetEndpoints
    } = useRequestsContext()

    return (
        <EndpointsTreeViewWithLocalState
            endpointsTree={endpointsTree}
            targetEndpoints={targetEndpoints}
            setTargetEndpoints={setTargetEndpoints}
        />
    );
};

export default DashboardServiceEndpointsTree;