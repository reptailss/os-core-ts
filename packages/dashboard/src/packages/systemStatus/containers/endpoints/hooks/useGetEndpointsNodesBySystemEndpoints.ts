import {SystemEndpoint} from "@packages/systemStatus/containers/endpoints/types";
import {useMemo} from "react";
import {EndpointNode} from "@containers/requests/types/endpoint";
import {getTreeEndpoints} from "@containers/requests/helpers/getTreeEndpoints";

export function useGetEndpointsNodesBySystemEndpoints({systemEndpoints}: {
    systemEndpoints: SystemEndpoint[]
}): EndpointNode[] {
    return useMemo(() => {
        if (!systemEndpoints?.length) {
            return []
        }
        const routes: string[] = []
        systemEndpoints.forEach((item) => {
            if (item.endpoints.length > 0) {
                item.endpoints.forEach((endpoint) => {
                    routes.push(`${item.service_key}/${endpoint}`)
                })
            }
        })
        return getTreeEndpoints(routes)
    }, [systemEndpoints])
}