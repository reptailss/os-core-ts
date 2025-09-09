import {apiRequestWithAuth} from '@helpers/query/apiRequestWithAuth'
import {CustomPageResults} from '@containers/customPages/types'
import {getRootApiUrl} from '@helpers/apiUrl/getRootApiUrl'


export const getCustomPages = async (): Promise<CustomPageResults> => {

    return await apiRequestWithAuth<CustomPageResults>({
        url: `${getRootApiUrl()}dashboard/getCustomPages`,
        options: {
            method: 'GET',
        },
    })

}
