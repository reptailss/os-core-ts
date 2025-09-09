import {apiRequestWithAuth} from '@helpers/query/apiRequestWithAuth'
import {serialize} from '@helpers/query/serialize'
import {ServerLog} from '@containers/serverLogs/types'
import {getRandomString} from '@helpers/string/getRandomString'
import {getRootApiUrl} from '@helpers/apiUrl/getRootApiUrl'


function parseDateToISO(dateStr: string): string {
    const [day, month, year] = dateStr.split('/').map(Number)
    const date = new Date(Date.UTC(year, month - 1, day))
    return date.toISOString()
}

export const getSystemStatusServerLogs = async ({
                                        dateStart,
                                        dateEnd,
                                    }: {
    dateStart: string,
    dateEnd: string
}): Promise<ServerLog[]> => {

    const res = await apiRequestWithAuth<string[]>({
        url: `${getRootApiUrl()}os-logs?` + serialize({
            date_start: parseDateToISO(dateStart),
            date_end: parseDateToISO(dateEnd),
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
