import {RequestErrorStatus} from "@containers/requests/types/errorStatus";
import {SystemEndpoint} from "@packages/systemStatus/containers/endpoints/types";


export const buildSystemRequestsFiltersServiceKeysAndRoutePaths = ({
																	   targetEndpoints,
																	   systemEndpoints,
																   }: {
	targetEndpoints: string[],
	systemEndpoints: SystemEndpoint[]
}) => {
	if(!targetEndpoints?.length){
		return {
			serviceKeys:[],
			routePaths:[],
		}
	}
	const serviceKeys: string[] = []
	const routePaths: string[] = []
	
	const endpointsByServices: Record<string, string[]> = {}
	
	for (const targetEndpoint of targetEndpoints) {
		if (targetEndpoint[0] === '/') {
			const [_, serviceKey, ...routePathArray] = targetEndpoint.split('/')
			if (!(serviceKey in endpointsByServices)) {
				endpointsByServices[serviceKey] = []
			}
			endpointsByServices[serviceKey].push(`/${routePathArray.join('/')}`)
			continue
		}
		const [serviceKey, ...routePathArray] = targetEndpoint.split('/')
		if (!(serviceKey in endpointsByServices)) {
			endpointsByServices[serviceKey] = []
		}
		endpointsByServices[serviceKey].push(`/${routePathArray.join('/')}`)
	}
	let hasAllSelectServices = true
	for (const serviceKey in endpointsByServices) {
		
		const service = systemEndpoints.find((item) => item.service_key === serviceKey)
		if (!service) {
			continue
		}
		const endpoints = endpointsByServices[serviceKey]
		if (service.endpoints.length !== endpoints.length) {
			hasAllSelectServices = false
			break
		}
	}
	
	for (const serviceKey in endpointsByServices) {
		if (hasAllSelectServices) {
			serviceKeys.push(serviceKey)
			continue
		}
		serviceKeys.push(serviceKey)
		routePaths.push(...endpointsByServices[serviceKey])
	}
	
	return  {
		serviceKeys,
		routePaths
	}
}
export const buildSystemRequestsFilters = ({
											   targetEndpoints,
											   statusCodes,
											   errorStatus,
											   errorCodes,
											   systemEndpoints,
											   where,
										   }: {
	targetEndpoints: string[],
	statusCodes: (string | number)[],
	errorStatus: RequestErrorStatus,
	errorCodes: string[]
	systemEndpoints: SystemEndpoint[]
	where: string | undefined
}) => {
	if (
		!targetEndpoints.length &&
		!statusCodes.length &&
		errorStatus === 'all' &&
		!errorCodes.length && !where?.length
	) {
		return {}
	}
	
	const endpointsByServices: Record<string, string[]> = {}
	
	for (const targetEndpoint of targetEndpoints) {
		if (targetEndpoint[0] === '/') {
			const [_, serviceKey, ...routePathArray] = targetEndpoint.split('/')
			if (!(serviceKey in endpointsByServices)) {
				endpointsByServices[serviceKey] = []
			}
			endpointsByServices[serviceKey].push(`/${routePathArray.join('/')}`)
			continue
		}
		const [serviceKey, ...routePathArray] = targetEndpoint.split('/')
		if (!(serviceKey in endpointsByServices)) {
			endpointsByServices[serviceKey] = []
		}
		endpointsByServices[serviceKey].push(`/${routePathArray.join('/')}`)
	}
	
	const serviceKeys: string[] = []
	const routePaths: string[] = []
	
	let hasAllSelectServices = true
	for (const serviceKey in endpointsByServices) {
		
		const service = systemEndpoints.find((item) => item.service_key === serviceKey)
		if (!service) {
			continue
		}
		const endpoints = endpointsByServices[serviceKey]
		if (service.endpoints.length !== endpoints.length) {
			hasAllSelectServices = false
			break
		}
	}
	
	for (const serviceKey in endpointsByServices) {
		if (hasAllSelectServices) {
			serviceKeys.push(serviceKey)
			continue
		}
		serviceKeys.push(serviceKey)
		routePaths.push(...endpointsByServices[serviceKey])
	}
	const res: Record<string, string | (string[]) | number | (number[]) | (string | number)[]> = {}
	
	if (routePaths.length >= 1) {
		if (routePaths.length === 1) {
			res['route_path'] = routePaths[0]
		} else {
			res['route_path IN'] = [...new Set(routePaths)]
		}
	}
	
	if (serviceKeys.length >= 1) {
		if (serviceKeys.length === 1) {
			res['service_key'] = serviceKeys[0]
		} else {
			res['service_key IN'] = [...new Set(serviceKeys)]
		}
	}
	if (statusCodes.length >= 1) {
		if (statusCodes.length === 1) {
			res['response_status_code'] = statusCodes[0]
		} else {
			res['response_status_code IN'] = statusCodes
		}
	}
	
	if (errorCodes.length >= 1) {
		if (errorCodes.length === 1) {
			res['error_code'] = errorCodes[0]
		} else {
			res['error_code IN'] = errorCodes
		}
	}
	if (errorStatus && errorStatus !== 'all') {
		res['error'] = errorStatus === 'error' ? 1 : 0
	}
	
	if (where && where.length > 1) {
		return {
			where: {
				...res,
				...JSON.parse(where),
			}
		}
	}
	
	return {
		where: res
	}
}