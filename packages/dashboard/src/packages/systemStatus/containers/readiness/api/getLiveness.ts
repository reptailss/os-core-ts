import {apiRequestWithAuth} from '@helpers/query/apiRequestWithAuth'
import {LivenessResult} from '@containers/readiness/types'
import {getRootApiUrl} from '@helpers/apiUrl/getRootApiUrl'
import SystemStatusReadinessPage from "@packages/systemStatus/pages/readiness/SystemStatusReadinessPage";


export const getSystemStatusLiveness = async (): Promise<LivenessResult> => {
    return await apiRequestWithAuth<LivenessResult>({
        url: `${getRootApiUrl()}liveness`,
        options: {
            method: 'GET',
        },
    })

}
