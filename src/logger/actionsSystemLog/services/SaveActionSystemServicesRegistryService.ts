import {APP_CONFIG_OS_CORE} from '@appConfig'
import {appLogger} from '@logger'
import {SystemEndpointsHelper, SystemRequestHelper} from '@helpers'

export class SaveActionSystemServicesRegistryService {

    static async saveServicesRegistry({serviceKey}: {
        serviceKey: string
    }): Promise<void> {
        if (!APP_CONFIG_OS_CORE.urls.actionsSystemLoggerServiceUrl) {
            appLogger.error('Not found actions logger api url in env')
            return
        }
        try {
            await SystemRequestHelper.post({
                url: APP_CONFIG_OS_CORE.urls.actionsSystemLoggerServiceUrl + SystemEndpointsHelper.buildSystemEndpointUrl('/services/save'),
                serviceKey: 'actions-logger',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    service_key: serviceKey,
                }),
            })
        } catch (error) {
            appLogger.error('error save service key to actions-logger service', error)
        }
    }
}