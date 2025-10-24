import {apiRequestWithAuth} from '@helpers/query/apiRequestWithAuth'
import {serialize} from '@helpers/query/serialize'
import {
	GetSystemStatusServerRequestsParams,
	SystemStatusServerRequestsResponse
} from '@packages/systemStatus/containers/requests/types'
import {
	buildSystemRequestsFilters,
	buildSystemRequestsFiltersServiceKeysAndRoutePaths
} from '@packages/systemStatus/containers/requests/api/helpers/buildSystemRequestsFilters'
import {getRootApiUrl} from '@helpers/apiUrl/getRootApiUrl'
import {SystemEndpoint} from '@packages/systemStatus/containers/endpoints/types'
import {RequestErrorStatus} from '@containers/requests/types/errorStatus'
import {ServerRequestsData} from '@containers/requests/types'
import moment from 'moment'


export const getSystemStatusRequests = async ({
												  dateStart,
												  dateEnd,
												  page,
												  perPage,
												  order,
												  orderBy,
												  targetEndpoints,
												  statusCodes,
												  errorStatus,
												  errorCodes,
												  where,
											  }: GetSystemStatusServerRequestsParams,
											  systemEndpoints: SystemEndpoint[]
): Promise<SystemStatusServerRequestsResponse> => {
	return await apiRequestWithAuth<SystemStatusServerRequestsResponse>({
		url: `${getRootApiUrl()}request-logs/list?` + serialize({
			date_start: moment(dateStart).format('YYYY-MM-DD'),
			date_end: moment(dateEnd).format('YYYY-MM-DD'),
			page,
			per_page: perPage,
			order: {
				[orderBy]: order
			},
			...buildSystemRequestsFilters({
				targetEndpoints,
				statusCodes,
				errorStatus,
				errorCodes,
				systemEndpoints,
				where,
			})
		}),
		options: {
			method: 'GET',
		},
	})
}


export const getSystemStatusRequestsByMonth = async ({
														 dateStart,
														 targetEndpoints,
														 offset,
														 openUserId,
														 errorStatus,
														 limit,
														 order,
													 }: {
														 dateStart: Date
														 openUserId: number | null
														 targetEndpoints: string[]
														 offset: number
														 errorStatus: RequestErrorStatus
														 limit: number
														 order: 'ASC' | 'DESC' | null
													 },
													 systemEndpoints: SystemEndpoint[]
): Promise<ServerRequestsData> => {
	const {
		serviceKeys,
		routePaths
	} = buildSystemRequestsFiltersServiceKeysAndRoutePaths({
		targetEndpoints,
		systemEndpoints,
	})
	return await apiRequestWithAuth<ServerRequestsData>({
		url: `${getRootApiUrl()}request-logs/list-by-month?` + serialize({
			date_start: moment(dateStart).toISOString(),
			offset,
			limit,
			...(serviceKeys.length ? {service_keys: serviceKeys.join(',')} : {}),
			...(routePaths.length ? {route_paths: routePaths.join(',')} : {}),
			...(openUserId ? {open_user_id: openUserId} : {}),
			...(errorStatus !== 'all' ? {error: errorStatus === 'error' ? 1 : 0} : {}),
			...(order ? {
				order
			} : {})
		}),
		options: {
			method: 'GET',
		},
	})
}
