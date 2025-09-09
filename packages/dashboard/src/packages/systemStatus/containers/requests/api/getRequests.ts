import {apiRequestWithAuth} from '@helpers/query/apiRequestWithAuth'
import {serialize} from '@helpers/query/serialize';
import {
    GetSystemStatusServerRequestsParams,
    SystemStatusServerRequestsResponse
} from "@packages/systemStatus/containers/requests/types";
import {
    buildSystemRequestsFilters
} from "@packages/systemStatus/containers/requests/api/helpers/buildSystemRequestsFilters";
import {getRootApiUrl} from '@helpers/apiUrl/getRootApiUrl';


function transformDateFormat(dateStr: string): string {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`
}

export const getSystemStatusRequests = async ({
                                                  dateStart,
                                                  dateEnd,
                                                  page,
                                                  perPage,
                                                  order,
                                                  orderBy,
                                                  targetEndpoints,
                                                  statusCodes,
                                                  errorStatus,
                                                  errorCodes,
                                              }: GetSystemStatusServerRequestsParams): Promise<SystemStatusServerRequestsResponse> => {
    return await apiRequestWithAuth<SystemStatusServerRequestsResponse>({
        url: `${getRootApiUrl()}request-logs/list?` + serialize({
            date_start: transformDateFormat(dateStart),
            date_end: transformDateFormat(dateEnd),
            page,
            per_page: perPage,
            order: {
                [orderBy]: order
            },
            ...buildSystemRequestsFilters({
                targetEndpoints,
                statusCodes,
                errorStatus,
                errorCodes,
            })
        }),
        options: {
            method: 'GET',
        },
    })
}
