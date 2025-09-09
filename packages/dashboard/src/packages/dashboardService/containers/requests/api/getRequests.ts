import {ServerRequests, ServerRequestsData} from '@containers/requests/types'
import {apiRequestWithAuth} from '@helpers/query/apiRequestWithAuth'
import {transformRequestsData} from '@containers/requests/helpers/transformRequestsData'
import {getRootApiUrl} from '@helpers/apiUrl/getRootApiUrl'


export const getDashboardServiceRequests = async (): Promise<ServerRequests> => {

    const res = await apiRequestWithAuth<ServerRequestsData>({
        url: `${getRootApiUrl()}os-requests-info`,
        options: {
            method: 'GET',
        },
    })
    return transformRequestsData(res)
}
