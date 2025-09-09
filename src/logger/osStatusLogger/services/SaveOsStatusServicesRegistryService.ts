import {APP_CONFIG_OS_CORE} from '@appConfig'
import { appLogger } from '@logger'
import {SystemEndpointsHelper, SystemRequestHelper} from '@helpers'


export class SaveOsStatusServicesRegistryService {

    static async saveServicesRegistry({serviceKey, endpoints}: {
        serviceKey: string
        endpoints: string[]
    }): Promise<void> {
        if (!APP_CONFIG_OS_CORE.urls.osStatusServiceUrl) {
            appLogger.error('Not found os status api url in env')
            return
        }
        try {
            await SystemRequestHelper.post({
                url: APP_CONFIG_OS_CORE.urls.osStatusServiceUrl + SystemEndpointsHelper.buildSystemEndpointUrl('/services/save'),
                serviceKey: 'os-status',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    service_key: serviceKey,
                    endpoints,
                }),
            })
        } catch (error) {
            appLogger.error('error save api os status logs', error)
        }
    }
}