import {APP_CONFIG_OS_CORE} from '@appConfig'


export class OsCoreAppConfig {
    public static getServiceKey(): string {
        return APP_CONFIG_OS_CORE.serviceKey
    }
    
    public static getServicePrefix(): string | null {
        return APP_CONFIG_OS_CORE.servicePrefix
    }
}