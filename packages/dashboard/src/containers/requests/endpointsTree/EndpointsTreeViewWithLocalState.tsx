import React, {useEffect, useMemo, useState} from 'react';
import {transformEndpointsTree} from "./helpers/transformEndpointsTree";
import Button from "@mui/material/Button";
import {EndpointNode} from "@containers/requests/types/endpoint";
import {SetStateFn} from "@baseTypes/state";
import EndpointsTreeView from "@containers/requests/endpointsTree/EndpointsTreeView";

interface Props {
    endpointsTree: EndpointNode[],
    targetEndpoints: string[],
    setTargetEndpoints: SetStateFn<string[]>,
}

const EndpointsTreeViewWithLocalState = ({
                                             endpointsTree,
                                             targetEndpoints,
                                             setTargetEndpoints,
                                         }: Props) => {

    const [localTargetEndpoints, setLocalTargetEndpoints] = useState<string[]>(targetEndpoints || [])

    const items = useMemo(() => {
        return transformEndpointsTree(endpointsTree)
    }, [endpointsTree])


    const onSave = () => {
        setTargetEndpoints(localTargetEndpoints)
    }

    useEffect(() => {
        setLocalTargetEndpoints(targetEndpoints)
    }, [targetEndpoints]);

    if (!items?.length) {
        return <></>
    }


    return (
        <EndpointsTreeView
            endpointsTree={endpointsTree}
            targetEndpoints={localTargetEndpoints}
            setTargetEndpoints={setLocalTargetEndpoints}
        >
            <Button
                onClick={onSave}
                variant={'outlined'}
                fullWidth
            >
                Примінити
            </Button>
        </EndpointsTreeView>
    )
};

export default EndpointsTreeViewWithLocalState;
