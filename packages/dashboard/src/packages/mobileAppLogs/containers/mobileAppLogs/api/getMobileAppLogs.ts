import {apiRequestWithAuth} from '@helpers/query/apiRequestWithAuth'
import {serialize} from '@helpers/query/serialize';
import {getRootApiUrl} from '@helpers/apiUrl/getRootApiUrl';
import {GetMobileAppLogsParams, MobileAppLogsResponse} from "@packages/mobileAppLogs/containers/mobileAppLogs/types";
import moment from 'moment';



export const getMobileAppLogsApi = async ({
											  dateStart,
											  dateEnd,
											  page,
											  perPage,
											  order,
											  orderBy,
											  where
										  }: GetMobileAppLogsParams): Promise<MobileAppLogsResponse> => {
	return await apiRequestWithAuth<MobileAppLogsResponse>({
		url: `${getRootApiUrl()}api/event-list?` + serialize({
			date_start: moment(dateStart).format('YYYY-MM-DD'),
			date_end: moment(dateEnd).format('YYYY-MM-DD'),
			page,
			per_page: perPage,
			...(orderBy ? {
				order: {
					[orderBy]: order
				},
			} : {}),
			...(where && where.length > 1 ? {where: JSON.parse(where)} : {})
		}),
		options: {
			method: 'GET',
		},
	})
}
