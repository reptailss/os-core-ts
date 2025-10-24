import {apiRequestWithAuth} from '@helpers/query/apiRequestWithAuth'
import {DataSystemEndpoints} from '@packages/systemStatus/containers/endpoints/types'
import {getRootApiUrl} from '@helpers/apiUrl/getRootApiUrl'
import {serialize} from '@helpers/query/serialize'

export const getSystemEndpoints = async (): Promise<DataSystemEndpoints> => {
	return await apiRequestWithAuth<DataSystemEndpoints>({
		url: `${getRootApiUrl()}services/list?` + serialize({
			page: 1,
			per_page: 0
		}),
		options: {
			method: 'GET',
		},
	})
}