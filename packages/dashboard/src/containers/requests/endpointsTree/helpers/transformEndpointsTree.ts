import {EndpointNode} from "../../types/endpoint";


type ExtendedTreeItemProps = {
    color?: 'blue' | 'green';
    id: string;
    label: string;
    children: ExtendedTreeItemProps[],
    fullPath: string
};


export const transformEndpointsTree = (endpointsTree: EndpointNode[]): ExtendedTreeItemProps[] => {
    if(!endpointsTree?.length){
        return  []
    }
    return endpointsTree?.map((endpoint,) => {
        return {
            id: endpoint.fullPath,
            label: endpoint.name,
            children: transformEndpointsTree(endpoint.children),
            color: endpoint.children.length >= 1 ? 'blue' : 'green',
            fullPath: endpoint.fullPath
        }
    })
}
