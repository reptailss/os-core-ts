import {APP_CONFIG_OS_CORE} from '@appConfig'


export class OsCoreAppConfig {
    public static getServiceKey(): string {
        return APP_CONFIG_OS_CORE.serviceKey
    }
}