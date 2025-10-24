import {apiRequestWithAuth} from '@helpers/query/apiRequestWithAuth'
import {serialize} from '@helpers/query/serialize';
import {getRootApiUrl} from '@helpers/apiUrl/getRootApiUrl';
import {ActionsLogsResponse, GetActionsLogsParams} from "@packages/actionsLogger/containers/actionsLogs/types";
import {
    buildActionsLogsFilters
} from "@packages/actionsLogger/containers/actionsLogs/api/helpers/buildActionsLogsFilters";
import moment from 'moment';


export const getActionsLogsApi = async ({
                                         dateStart,
                                         dateEnd,
                                         page,
                                         perPage,
                                         order,
                                         orderBy,
                                         dbType,
                                         database,
                                         rowId,
                                         action,
                                         table,
                                         openUserId,
                                         serviceKey,
                                     }: GetActionsLogsParams): Promise<ActionsLogsResponse> => {
    return await apiRequestWithAuth<ActionsLogsResponse>({
        url: `${getRootApiUrl()}system-logs/list?` + serialize({
            date_start: moment(dateStart).format('YYYY-MM-DD'),
            date_end: moment(dateEnd).format('YYYY-MM-DD'),
            page,
            per_page: perPage,
            order: {
                [orderBy]: order
            },
            ...buildActionsLogsFilters({
                dbType,
                database,
                rowId,
                action,
                table,
                openUserId,
                serviceKey,
            })
        }),
        options: {
            method: 'GET',
        },
    })
}
