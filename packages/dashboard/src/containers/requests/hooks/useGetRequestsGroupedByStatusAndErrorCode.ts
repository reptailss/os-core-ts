import {useMemo} from "react";
import {ServerRequestGroupedByErrorCode, ServerRequestGroupedByStatus} from "../types/grouped";
import {ServerRequest} from "../types";
import {
    groupByStatusAndErrorCode
} from "@containers/requests/grouped/groupedByStatus/helpers/groupByStatusAndErrorCode";
import {ServerMeta} from "@containers/requests/types/meta";


export function useGetRequestsGroupedByStatusAndErrorCode(
    requests: ServerMeta[]
): {
    requestsGroupedByStatus: ServerRequestGroupedByStatus[],
    requestsGroupedByErrorCode: ServerRequestGroupedByErrorCode[],
} {

    return useMemo(() => {
        if (!requests?.length) {
            return {
                requestsGroupedByStatus: [],
                requestsGroupedByErrorCode: []
            }
        }
        return groupByStatusAndErrorCode(requests)

    }, [requests])
}
