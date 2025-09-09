import {RequestErrorStatus} from "@containers/requests/types/errorStatus";

export const buildSystemRequestsFilters = ({
                                               targetEndpoints,
                                               statusCodes,
                                               errorStatus,
                                               errorCodes,
                                           }: {
    targetEndpoints: string[],
    statusCodes: (string | number)[],
    errorStatus: RequestErrorStatus,
    errorCodes: string[]
}) => {
    if (!targetEndpoints?.length && !statusCodes?.length && errorStatus === 'all' && !errorCodes?.length) {
        return {}
    }
    const routePaths: string[] = []
    const serviceKeys: string[] = []
    if (targetEndpoints?.length >= 1) {
        targetEndpoints.forEach(targetEndpoint => {
            if (targetEndpoint[0] === '/') {
                const [empty, serviceKey, ...routePathArray] = targetEndpoint.split('/')
                serviceKeys.push(serviceKey)
                routePaths.push(`/${routePathArray.join('/')}`)
                return
            }
            const [serviceKey, ...routePathArray] = targetEndpoint.split('/')
            serviceKeys.push(serviceKey)
            routePaths.push(`/${routePathArray.join('/')}`)
        })
    }


    return {
        where: {
            ...(targetEndpoints?.length >= 1 ? {
                ...(routePaths.length === 1 ? {
                    'route_path': routePaths[0],
                } : {
                    'route_path IN': [...new Set(routePaths)],
                }),
                ...(serviceKeys.length === 1 ? {
                    'service_key': serviceKeys[0],
                } : {
                    'service_key IN': [...new Set(serviceKeys)],
                }),
            } : {}),

            ...(statusCodes?.length > 1 ? {
                'response_status_code IN': statusCodes,
            } : {}),
            ...(statusCodes?.length === 1 ? {
                response_status_code: statusCodes[0]
            } : {}),
            ...(errorStatus === 'error' || errorStatus === 'notError' ? {
                error: errorStatus === 'error' ? 1 : 0,
            } : {}),
            ...(errorCodes?.length > 1 ? {
                'error_code IN': errorCodes,
            } : {}),
            ...(errorCodes?.length === 1 ? {
                'error_code': errorCodes[0],
            } : {})
        }
    }
}