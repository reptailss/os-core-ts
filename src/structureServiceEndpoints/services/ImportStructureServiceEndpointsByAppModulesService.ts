import {IAppModule} from '@appModule'
import {APP_CONFIG_OS_CORE} from '@appConfig'
import {ImportStructureServicesService} from '@structureServiceEndpoints/core'

export class ImportStructureServiceEndpointsByAppModulesService {
    
    public async importByAppModules(appModules: IAppModule[], type: 'default' | 'plugin'): Promise<void> {
        const endpoints: {
            key: string
            name: string
        }[] = []
        for (const appModule of appModules) {
            if (appModule.controllers?.length) {
                const endpoints = this.getImportStructureServicesEndpointsByAppModule(appModule)
                if (endpoints.length) {
                    endpoints.push(...endpoints)
                }
            }
        }
        
        if (!endpoints.length) {
            return
        }
        
        await ImportStructureServicesService.importServices({
            service_key: APP_CONFIG_OS_CORE.serviceKey,
            endpoints,
            type,
        })
        
    }
    
    private getImportStructureServicesEndpointsByAppModule(appModule: IAppModule): {
        key: string
        name: string
    }[] {
        
        const res: {
            key: string
            name: string
        }[] = []
        
        if (appModule.appModules?.length) {
            appModule.appModules.forEach((childAppModule) => {
                const childRes = this.getImportStructureServicesEndpointsByAppModule(childAppModule)
                if (childRes?.length) {
                    res.push(...childRes)
                }
            })
        }
        
        if (appModule.controllers?.length) {
            appModule.controllers.forEach(controller => {
                if (!controller?.endpoints?.length) {
                    return
                }
                controller.endpoints.forEach(endpoint => {
                    if (
                        !controller.importStructureServiceEndpoints ||
                        !(endpoint._propertyKey in controller.importStructureServiceEndpoints)) {
                        return
                    }
                    const data = controller.importStructureServiceEndpoints[endpoint._propertyKey]
                    res.push({
                        name: data?.name || '',
                        key: data?.key || endpoint.path,
                    })
                })
            })
        }
        
        
        return res
    }
}