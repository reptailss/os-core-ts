import {apiRequestWithAuth} from '@helpers/query/apiRequestWithAuth'
import {serialize} from '@helpers/query/serialize'
import {ServerLog} from '@containers/serverLogs/types'
import {getRandomString} from '@helpers/string/getRandomString'
import {getRootApiUrl} from '@helpers/apiUrl/getRootApiUrl'
import moment from 'moment'




export const getDashboardServiceServerLogs = async ({
                                        dateStart,
                                        dateEnd,
                                    }: {
    dateStart: Date,
    dateEnd: Date
}): Promise<ServerLog[]> => {

    const res = await apiRequestWithAuth<string[]>({
        url: `${getRootApiUrl()}os-logs?` + serialize({
            date_start: moment(dateStart).format('YYYY-MM-DD'),
            date_end: moment(dateEnd).format('YYYY-MM-DD'),
        }),
        options: {
            method: 'GET',
        },
    })

    return res?.map((log, index) => {
        return {
            log,
            lineNumber: index,
            id: getRandomString(),
        }
    })
}
