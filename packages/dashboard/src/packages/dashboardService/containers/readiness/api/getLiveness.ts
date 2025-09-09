import {apiRequestWithAuth} from '@helpers/query/apiRequestWithAuth'
import {LivenessResult} from '@containers/readiness/types'
import {getRootApiUrl} from '@helpers/apiUrl/getRootApiUrl'


export const getDashboardServiceLiveness = async (): Promise<LivenessResult> => {
    return await apiRequestWithAuth<LivenessResult>({
        url: `${getRootApiUrl()}liveness`,
        options: {
            method: 'GET',
        },
    })

}
