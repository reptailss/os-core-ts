import React, {ReactNode, useMemo} from 'react';
import CardContent from "@mui/material/CardContent";
import {RichTreeView} from "@mui/x-tree-view/RichTreeView";
import EndpointTreeItem from './EndpointTreeItem';
import {transformEndpointsTree} from "./helpers/transformEndpointsTree";
import {sx} from './sx'
import {EndpointNode} from "@containers/requests/types/endpoint";
import {SetStateFn} from "@baseTypes/state";

interface Props {
    endpointsTree: EndpointNode[],
    targetEndpoints: string[],
    setTargetEndpoints: SetStateFn<string[]>,
    children?: ReactNode,
    onChangeEndpoints?:()=>void
}

const EndpointsTreeView = ({
                               endpointsTree,
                               targetEndpoints,
                               setTargetEndpoints,
                               children,
                               onChangeEndpoints,
                           }: Props) => {


    const items = useMemo(() => {
        return transformEndpointsTree(endpointsTree)
    }, [endpointsTree])


    if (!items?.length) {
        return <></>
    }

    return (

        <CardContent>
            <RichTreeView
                items={items}
                aria-label="pages"
                multiSelect
                sx={sx.root}
                slots={{
                    item: (props) => <EndpointTreeItem
                        targetIds={targetEndpoints}
                        setTargetIds={setTargetEndpoints}
                        onChangeEndpoints={onChangeEndpoints}
                        {...props}
                    />
                }}
            />
            {children && children}
        </CardContent>

    );
};

export default EndpointsTreeView;
