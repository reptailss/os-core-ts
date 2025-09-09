import {useMemo} from "react";
import {ServerRequestGroupedByStatus} from "../types/grouped";
import {ServerRequest} from "../types";
import {groupByStatusAndDays} from "../grouped/groupedByStatus/helpers/groupByStatusAndDays";




export function useGetRequestsGroupedByStatus(
    requests: ServerRequest[]
): ServerRequestGroupedByStatus[] {

    return useMemo(() => {
        if (!requests?.length) {
            return []
        }
        return groupByStatusAndDays(requests)

    }, [requests])
}
