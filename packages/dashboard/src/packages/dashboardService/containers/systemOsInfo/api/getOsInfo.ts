import {apiRequestWithAuth} from '@helpers/query/apiRequestWithAuth'
import {OsInfo} from '@containers/osInfo/types'
import {getRootApiUrl} from '@helpers/apiUrl/getRootApiUrl'


export const getDashboardServiceOsInfo = async (): Promise<OsInfo> => {

    return await apiRequestWithAuth<OsInfo>({
        url: `${getRootApiUrl()}os-status`,
        options: {
            method: 'GET',
        },
    })

}
