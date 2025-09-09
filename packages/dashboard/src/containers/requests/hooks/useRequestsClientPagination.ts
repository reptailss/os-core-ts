import {useDebounce} from "@hooks/useDebounce";
import * as React from "react";
import {getComparatorRequestsList} from "@containers/requests/requestsList/helpers";
import {usePaginationCustom} from "@hooks/usePaginationCustom";
import {RequestsListState} from "@containers/requests/requestsState/types";
import {TransformServerMeta} from "@containers/requests/types/transform";

export function useRequestsClientPagination({
                                                requestsListState,
                                                requests
                                            }: {
    requestsListState: RequestsListState,
    requests: TransformServerMeta[],
}): {
    paginationData: TransformServerMeta[],
    totalPage: number,
} {
    const filteredRows = React.useMemo(
        () => {
            if (!requests?.length) {
                return []
            }

            let arr = requests?.slice().sort(getComparatorRequestsList(requestsListState.order, requestsListState.orderBy))

            if(requestsListState.statusCodes?.length >=1) {
                arr = arr.filter((item) => {
                    return requestsListState.statusCodes.map(Number).includes(item.response_status_code)
                })
            }
            if(requestsListState.errorCodes?.length >=1) {
                arr = arr.filter((item) => {
                    return item.error_code &&  requestsListState.errorCodes.includes(item.error_code)
                })
            }

            if(requestsListState.errorStatus === 'error' || requestsListState.errorStatus === 'notError') {
                arr = arr.filter((item) => {
                    return item.error === (requestsListState.errorStatus === 'error' ? 1 : 0)
                })
            }

            return arr
        },
        [
            requests,
            requestsListState.order,
            requestsListState.orderBy,
            requestsListState.statusCodes,
            requestsListState.errorCodes,
            requestsListState.errorStatus
        ],
    );

    return usePaginationCustom({
        data: filteredRows,
        page: requestsListState.page,
        perPage: requestsListState.perPage
    })

}