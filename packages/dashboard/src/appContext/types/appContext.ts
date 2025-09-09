import {
    GroupedByEndpointResult,
    ServerRequestGroupedByErrorCode,
    ServerRequestGroupedByStatus
} from "@containers/requests/types/grouped";
import {EndpointNode} from "@containers/requests/types/endpoint";
import {SetStateFn} from "@baseTypes/state";
import {CustomPage} from "@containers/customPages/types";
import {TransformServerMeta} from "@containers/requests/types/transform";
import {NavigateItem} from "@views/navigation/types";

export interface AppContext {
    navigations:NavigateItem[]

}
