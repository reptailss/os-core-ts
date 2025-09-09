import {TransformServerMeta} from "@containers/requests/types/transform";
import {useMemo} from "react";

export function useGetDashboardServiceRequestsFiltersByTargetEndpoints({
                                                                           requests,
                                                                           targetEndpoints,
                                                                           endpointPaths,
                                                                       }: {
    requests: TransformServerMeta[],
    targetEndpoints: string[],
    endpointPaths: string[]
}): TransformServerMeta[] {
    return useMemo(() => {
            if (targetEndpoints.length === endpointPaths.length) {
                return requests
            }
            return requests.filter((request) => targetEndpoints.includes(request.__endpoint))
        },
        [
            requests,
            targetEndpoints,
            endpointPaths
        ])
}