import {apiRequestWithAuth} from '@helpers/query/apiRequestWithAuth'
import {ResponseSystemOsLog} from "@packages/systemStatus/containers/osInfoLogs/types";
import {serialize} from "@helpers/query/serialize";
import {
    buildSystemOsInfoLogsFilters
} from "@packages/systemStatus/containers/osInfoLogs/api/helpers/buildSystemOsInfoLogsFilters";
import {GetSystemStatusOsLogsProps} from "@packages/systemStatus/containers/osInfoLogs/types/getLogs";
import {getRootApiUrl} from '@helpers/apiUrl/getRootApiUrl';
import moment from 'moment'


export const getSystemStatusOsInfoLogs = async ({
                                                    dateEnd,
                                                    dateStart,
                                                    page,
                                                    perPage,
                                                    orderBy,
                                                    order,
                                                    serviceKeys,
                                                }: GetSystemStatusOsLogsProps): Promise<ResponseSystemOsLog> => {

    return await apiRequestWithAuth<ResponseSystemOsLog>({
        url: `${getRootApiUrl()}os-info-logs/list?` + serialize({
            date_start: moment(dateStart).format('YYYY-MM-DD'),
            date_end: moment(dateEnd).format('YYYY-MM-DD'),
            page,
            per_page: perPage,
            order: {
                [orderBy]: order
            },
            ...buildSystemOsInfoLogsFilters({
                serviceKeys
            })
        }),
        options: {
            method: 'GET',
        },
    })
}


