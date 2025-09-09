import {apiRequestWithAuth} from '@helpers/query/apiRequestWithAuth'
import {CustomData} from '@containers/customInfo/types'
import {getRootServicePrefix} from '@helpers/services/getRootServicePrefix'


export const getCustomData = async ({endpointPath}: {
    endpointPath: string
}): Promise<CustomData> => {
    const baseUrl = getRootServicePrefix()
    const currentBaseUrl = baseUrl === '/' ? '' : `/${baseUrl}`
    return await apiRequestWithAuth<CustomData>({
        url: `${currentBaseUrl}${endpointPath}`,
        options: {
            method: 'GET',
        },
    })

}
