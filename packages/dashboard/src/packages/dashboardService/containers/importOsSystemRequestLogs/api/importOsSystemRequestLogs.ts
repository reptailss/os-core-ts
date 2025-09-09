import {apiRequestWithAuth} from '@helpers/query/apiRequestWithAuth'
import {getRootApiUrl} from '@helpers/apiUrl/getRootApiUrl'
import {ResultImportOsSystemRequests} from "@packages/dashboardService/containers/importOsSystemRequestLogs/types";


export const importOsSystemRequestLogs = async (): Promise<ResultImportOsSystemRequests> => {

    return await apiRequestWithAuth<ResultImportOsSystemRequests>({
        url: `${getRootApiUrl()}import-os-status-requests`,
        options: {
            method: 'POST',
        },
    })

}
