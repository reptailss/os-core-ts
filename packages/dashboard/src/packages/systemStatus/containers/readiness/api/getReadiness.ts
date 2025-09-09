import {apiRequestWithAuth} from '@helpers/query/apiRequestWithAuth'
import {ReadinessResult} from '@containers/readiness/types'
import {getRootApiUrl} from '@helpers/apiUrl/getRootApiUrl'


export const getSystemStatusReadiness = async (): Promise<ReadinessResult> => {
    return await apiRequestWithAuth<ReadinessResult>({
        url: `${getRootApiUrl()}readiness`,
        options: {
            method: 'GET',
        },
    })

}
