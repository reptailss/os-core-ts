import { ImportResult } from "@responseFormat"
import {APP_CONFIG_OS_CORE} from '@appConfig'
import {AppError} from '@appError'
import {SystemEndpointsHelper, SystemRequestHelper} from '@helpers'


export class ImportStructureServicesService {

    public static async importServices({
                                           service_key,
                                           endpoints,
                                           type,
                                       }: {
        service_key: string
        type: 'default' | 'plugin'
        endpoints: {
            key: string
            name: string
        }[]
    }): Promise<ImportResult> {
        if (!APP_CONFIG_OS_CORE.urls.structureAccessServiceUrl) {
            throw new AppError('Not found structure access api url url in env', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
        return await SystemRequestHelper.post<ImportResult>({
            url: APP_CONFIG_OS_CORE.urls.structureAccessServiceUrl + SystemEndpointsHelper.buildSystemEndpointUrl('/global-service-endpoints/import'),
            serviceKey: 'structure',
            body: JSON.stringify({
                service_key,
                endpoints,
                type,
            }),
            headers: {
                'content-type': 'application/json',
            },
        })
    }
}


