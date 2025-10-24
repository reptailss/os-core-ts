import express, {Express, json, urlencoded} from 'express'
import cors from 'cors'
import http from 'http'
import qs from 'qs'
import {IApp, IAppPlugin} from '@app'
import {AppModule, IAppModule} from '@appModule'
import {APP_CONFIG_OS_CORE} from '@appConfig'

import {IRouterBuilder, RouterBuilder} from '@routerBuilder'
import {
    _initAppLogger,
    appLogger,
    consoleLoggerAppModule,
    osStatusLoggerAppModule,
    OsStatusLogsCron,
    requestLoggerAppModule,
    RequestsLoggerInitializer,
    RequestsLogsRoutesRegistry,
    SaveActionSystemServicesRegistryService,
    SaveOsStatusServicesRegistryService,
} from '@logger'
import {healthAppModule} from '@health'
import {dashboardAppModule} from '@dashboard'
import {ControllerSwaggerInfoRegistry, swaggerAppModule} from '@swagger'
import {ControllerMeta, ControllersHelper} from '@controllers'
import {AppRequest} from '@appRequest'
import {AppResponse} from '@appResponse'
import {AppRouterRequestHandler} from '@appRouter'
import {DiContainer, DiFactory, DiLifetime, DiToken} from '@di'
import {ImportStructureServicesService} from '@structureServiceEndpoints'


type ModulesConfig = {
    cors: boolean
    health: boolean
    dashboard: boolean
    swagger: boolean
    requestLogger: boolean
    consoleLogger: boolean
    enableSystemModulesFromEnv: boolean
    static: Record<string, {
        active: boolean
    }>
    importStructureServiceEndpoints: {
        active: boolean
        type: 'default' | 'plugin'
    }
}


export class App implements IApp {
    
    private readonly expressApp: Express = express()
    public readonly routerBuilder: IRouterBuilder = new RouterBuilder()
    private readonly appPlugins: IAppPlugin[] = []
    private readonly appModules: IAppModule[] = []
    private readonly modulesConfig: ModulesConfig = {
        cors: false,
        health: false,
        dashboard: false,
        swagger: false,
        requestLogger: false,
        consoleLogger: false,
        static: {},
        importStructureServiceEndpoints: {
            active: false,
            type: 'plugin',
        },
        enableSystemModulesFromEnv: false,
    }
    private notFoundAppRouterRequestHandler: AppRouterRequestHandler | null = null
    private serviceEndpoints: string[] = []
    private importStructureServiceEndpoints: {
        key: string
        name: string
    } [] = []
    
    public listen(port?: number, callback?: () => void): http.Server {
        const currentPort = port || APP_CONFIG_OS_CORE.servicePort
        return this.expressApp.listen(currentPort, callback ? callback : () => {
            appLogger.info('Service has been started on port:' + currentPort)
        })
    }
    
    
    public useModule(appModule: IAppModule): this {
        this.appModules.push(appModule)
        return this
    }
    
    public useStatic(dirPath: string): this {
        this.modulesConfig.static[dirPath] = {
            active: true,
        }
        return this
    }
    
    public useCors(): this {
        this.modulesConfig.cors = true
        return this
    }
    
    public useHealth(): this {
        this.modulesConfig.health = true
        return this
    }
    
    public useDashboard(): this {
        this.modulesConfig.dashboard = true
        return this
    }
    
    public useSwagger(): this {
        this.modulesConfig.swagger = true
        return this
    }
    
    public useRequestLogger(): this {
        this.modulesConfig.requestLogger = true
        return this
    }
    
    public useConsoleLogger(): this {
        this.modulesConfig.consoleLogger = true
        return this
    }
    
    public useImportStructureServiceEndpoints(type: 'default' | 'plugin'): this {
        this.modulesConfig.importStructureServiceEndpoints = {
            type,
            active: true,
        }
        return this
    }
    
    public usePlugin(plugin: IAppPlugin): this {
        this.appPlugins.push(plugin)
        return this
    }
    
    public enableSystemModulesFromEnv(): this {
        this.modulesConfig.enableSystemModulesFromEnv = true
        return this
    }
    
    public initModules(): this {
        if (this.appPlugins.length) {
            this.appPlugins.forEach(plugin => {
                plugin.register(this)
            })
        }
        this.expressApp.set('query parser', function(str: string) {
            return qs.parse(str, {arrayLimit: 1000})
        })
        this.expressApp.use(json({
            limit: '5mb',
        }))
        this.expressApp.use(urlencoded({extended: true}))
        
        if (this.modulesConfig.enableSystemModulesFromEnv ? APP_CONFIG_OS_CORE.hasCors : this.modulesConfig.cors) {
            this.expressApp.use(cors({origin: true, credentials: true}))
        }
        if (this.modulesConfig.health) {
            this.initSystemAppModule(healthAppModule)
        }
        if (this.modulesConfig.dashboard) {
            this.initSystemAppModule(dashboardAppModule)
        }
        if (this.modulesConfig.enableSystemModulesFromEnv ? APP_CONFIG_OS_CORE.swagger.hasSwagger : this.modulesConfig.swagger) {
            this.initSystemAppModule(swaggerAppModule)
        }
        if (this.modulesConfig.consoleLogger) {
            _initAppLogger()
            this.initSystemAppModule(consoleLoggerAppModule)
        }
        if (this.modulesConfig.requestLogger) {
            this.expressApp.use(new RequestsLoggerInitializer().buildMiddleware() as any)
            this.initSystemAppModule(requestLoggerAppModule)
            this.initSystemAppModule(osStatusLoggerAppModule)
            SaveOsStatusServicesRegistryService.saveServicesRegistry({
                serviceKey: APP_CONFIG_OS_CORE.serviceKey,
                endpoints: this.serviceEndpoints,
            }).then(() => {
                appLogger.info('Success save api key to os-status api')
            }).catch(() => {
                appLogger.error('Error save api key to os-status api')
            })
            SaveActionSystemServicesRegistryService.saveServicesRegistry({
                serviceKey: APP_CONFIG_OS_CORE.serviceKey,
            }).then(() => {
                appLogger.info('Success save api key to actions logger api')
            }).catch(() => {
                appLogger.error('Error save api key to actions logger api')
            })
            new OsStatusLogsCron().start()
        }
        
        for (const appModule of this.appModules) {
            this.initAppModule(appModule)
        }
        if (this.modulesConfig.importStructureServiceEndpoints.active) {
            ImportStructureServicesService.importServices({
                service_key: APP_CONFIG_OS_CORE.serviceKey,
                endpoints: this.importStructureServiceEndpoints,
                type: this.modulesConfig.importStructureServiceEndpoints.type,
            }).then(() => {
                appLogger.info('Success import api endpoints')
            }).catch((error) => {
                appLogger.error('Error save api endpoints', error)
            })
        }
        this.initStatics()
        
        if (this.notFoundAppRouterRequestHandler) {
            this.expressApp.use(this.notFoundAppRouterRequestHandler as any)
        }
        return this
        
    }
    
    public use(...props: any[]) {
        return this.expressApp.use(...props as any)
    }
    
    public useMiddleware(middleware: (req: AppRequest, res: AppResponse, next: () => void) => void): this {
        this.expressApp.use(middleware as any)
        return this
    }
    
    public set(key: string, value: unknown) {
        this.expressApp.set(key, value)
    }
    
    public useLocales({}: {
        locales: string[]
        defaultLocale: string
    }): this {
        return this
    }
    
    public useNotFoundRoute(appRouterRequestHandler: AppRouterRequestHandler): this {
        this.notFoundAppRouterRequestHandler = appRouterRequestHandler
        return this
    }
    
    public overrideProvider<T>(target: DiToken<T>, options: {
        lifetime?: DiLifetime
        useClass?: any
        useValue?: any
        useFactory?: DiFactory
    } = {}): this {
        DiContainer.register(target, options)
        return this
    }
    
    private initStatics(): void {
        for (const dirPath in this.modulesConfig.static) {
            this.expressApp.use(express.static(dirPath))
        }
    }
    
    
    private initAppModule(appModule: IAppModule): void {
        if (appModule.controllers.length) {
            const controllers: ControllerMeta[] = []
            appModule.controllers.forEach((Controller) => {
                const instance: ControllerMeta = DiContainer.resolve(
                    Controller,
                    appModule.getProviders(),
                )
                controllers.push(instance)
                if (instance.endpoints.length) {
                    instance.endpoints.forEach(endpoint => {
                        
                        this.serviceEndpoints.push(ControllersHelper.buildEndpointUrl({
                            endpointPath: endpoint.path,
                            isSystemEndpoint: endpoint.type === 'system',
                        }))
                        
                        if (this.modulesConfig.importStructureServiceEndpoints.active) {
                            if (
                                !instance.importStructureServiceEndpoints ||
                                !(endpoint._propertyKey in instance.importStructureServiceEndpoints)) {
                                return
                            }
                            const data = instance.importStructureServiceEndpoints[endpoint._propertyKey]
                            this.importStructureServiceEndpoints.push({
                                name: data?.name || '',
                                key: data?.key || endpoint.path,
                            })
                        }
                    })
                }
            })
            this.expressApp.use(this.routerBuilder.buildRoute(controllers) as any)
            if (this.modulesConfig.swagger) {
                ControllerSwaggerInfoRegistry.addFromControllers({
                    controllers: controllers,
                    baseSwaggerTag: appModule.swaggerInfo?.tag,
                })
            }
            if (this.modulesConfig.requestLogger) {
                RequestsLogsRoutesRegistry.addFromControllers(controllers)
            }
        }
    }
    
    
    private initSystemAppModule(appModule: AppModule): void {
        const controllers = appModule.controllers.map((Controller) => {
            return DiContainer.resolve(
                Controller,
                appModule.getProviders(),
            )
        })
        this.expressApp.use(this.routerBuilder.buildRoute(controllers) as any)
    }
}
