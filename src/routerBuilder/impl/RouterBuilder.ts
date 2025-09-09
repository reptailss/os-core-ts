import {Router} from 'express'
import {IRouterBuilder, RouterBuilderEndpointRegistrar} from '@routerBuilder'
import {Controller} from '@controllers'
import {AppError} from '@appError'
import {AppRouter} from '@appRouter'
import {DefaultRouteRegistrars} from './DefaultRouteRegistrars'


export class RouterBuilder implements IRouterBuilder {
    private readonly defaultRouteRegistrars = new DefaultRouteRegistrars()
    private readonly routeRegistrars = new Map<string, RouterBuilderEndpointRegistrar>()
    
    constructor() {
        this.registerRouteHandler('GET', this.defaultRouteRegistrars.getGetHandler())
        this.registerRouteHandler('POST', this.defaultRouteRegistrars.getPostHandler())
        this.registerRouteHandler('PUT', this.defaultRouteRegistrars.getPutHandler())
        this.registerRouteHandler('DELETE', this.defaultRouteRegistrars.getDeleteHandler())
    }
    
    public buildRoute(controllers: Controller[]): AppRouter {
        const router: AppRouter = Router() as AppRouter
        controllers.forEach(controller => {
            if (!controller?.endpoints?.length) {
                return
            }
            for (const endpoint of controller.endpoints) {
                const registrar = this.routeRegistrars.get(endpoint.method)
                if (!registrar) {
                    throw new AppError(`No registrar found for method "${endpoint.method}"`)
                }
                registrar(router, endpoint, controller)
            }
        })
        return router
    }
    
    public registerRouteHandler(
        method: string,
        registrar: RouterBuilderEndpointRegistrar,
    ): void {
        this.routeRegistrars.set(method, registrar)
    }
    
}