import {apiRequestWithAuth} from '@helpers/query/apiRequestWithAuth'
import {serialize} from '@helpers/query/serialize'
import {ServerLog} from '@containers/serverLogs/types'
import {getRandomString} from '@helpers/string/getRandomString'
import {getRootApiUrl} from '@helpers/apiUrl/getRootApiUrl'
import moment from 'moment'



export const getSystemStatusServerLogs = async ({
                                        dateStart,
                                        dateEnd,
                                    }: {
    dateStart: Date,
    dateEnd: Date
}): Promise<ServerLog[]> => {

    const res = await apiRequestWithAuth<string[]>({
        url: `${getRootApiUrl()}os-logs?` + serialize({
            date_start: moment.utc(dateStart).startOf('day').toISOString(),
            date_end: moment.utc(dateEnd).endOf('day').toISOString(),
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
