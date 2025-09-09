import {
    GetGlobalServiceEndpointsParams,
    GlobalServiceEndpoints
} from "@packages/access/containers/globalServiceEndpoints/types";

export type GetGlobalEndpoints = (props: GetGlobalServiceEndpointsParams) => Promise<GlobalServiceEndpoints[]>