import {useMemo} from "react";
import {GroupedByEndpointResult} from "../types/grouped";
import {groupByEndpointAndDays} from "../grouped/groupedByEndpoints/helpers/groupByEndpointAndDays";
import {TransformServerMeta} from "@containers/requests/types/transform";


export function useGetRequestsGroupedByEndpoints(
    requests: TransformServerMeta[]
): GroupedByEndpointResult {

    return useMemo(() => {
        return groupByEndpointAndDays(requests)

    }, [requests])
}
