import React from 'react';
import {SetStateFn} from "@baseTypes/state";
import {useGetSystemEndpoints} from "@packages/systemStatus/containers/endpoints/hooks/useGetSystemEndpoints";
import {
    useGetEndpointsNodesBySystemEndpoints
} from "@packages/systemStatus/containers/endpoints/hooks/useGetEndpointsNodesBySystemEndpoints";
import EndpointsTreeView from "@containers/requests/endpointsTree/EndpointsTreeView";


interface Props {
    targetEndpoints: string[],
    setTargetEndpoints: SetStateFn<string[]>,
    onChangeEndpoints?:()=>void
}

const SystemStatusEndpointsTree = ({
                                       targetEndpoints,
                                       setTargetEndpoints,
                                       onChangeEndpoints,
                                   }: Props) => {

    const {systemEndpoints} = useGetSystemEndpoints()
    const endpointsTree = useGetEndpointsNodesBySystemEndpoints({systemEndpoints})
    return (
        <EndpointsTreeView
            endpointsTree={endpointsTree}
            targetEndpoints={targetEndpoints}
            setTargetEndpoints={setTargetEndpoints}
            onChangeEndpoints={onChangeEndpoints}
        />
    );
};

export default SystemStatusEndpointsTree;