import {
    GroupedByEndpointResult,
    ServerRequestGroupedByErrorCode,
    ServerRequestGroupedByStatus
} from "@containers/requests/types/grouped";
import {EndpointNode} from "@containers/requests/types/endpoint";
import {SetStateFn} from "@baseTypes/state";
import {TransformServerMeta} from "@containers/requests/types/transform";

export interface RequestsContext {
    requests: TransformServerMeta[],
    refetchRequests: () => Promise<void>
    isLoadingRequests: boolean,
    requestsGroupedByStatus: ServerRequestGroupedByStatus[],
    endpointPaths: string[],
    endpointsTree: EndpointNode[],
    targetEndpoints: string[],
    setTargetEndpoints: SetStateFn<string[]>,
    requestsGroupedByEndpoints: GroupedByEndpointResult,
    requestsGroupedByErrorCode: ServerRequestGroupedByErrorCode[],
    totalPage?:number
}
