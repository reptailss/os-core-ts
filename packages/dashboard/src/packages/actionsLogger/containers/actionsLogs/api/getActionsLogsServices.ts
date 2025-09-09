import {getRootApiUrl} from '@helpers/apiUrl/getRootApiUrl';
import {apiRequestWithAuth} from '@helpers/query/apiRequestWithAuth'
import {serialize} from '@helpers/query/serialize';
import {ActionsLogsServicesResponse} from "@packages/actionsLogger/containers/actionsLogs/types";


export const getActionsLogsServicesApi = async (): Promise<ActionsLogsServicesResponse> => {
    return await apiRequestWithAuth<ActionsLogsServicesResponse>({
        url: `${getRootApiUrl()}services/list?` + serialize({
            page: 1,
            per_page: 0,
        }),
        options: {
            method: 'GET',
        },
    })
}
