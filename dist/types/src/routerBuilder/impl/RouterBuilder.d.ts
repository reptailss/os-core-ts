import { IRouterBuilder, RouterBuilderEndpointRegistrar } from "..";
import { Controller } from "../../controllers";
import { AppRouter } from "../../appRouter";
export declare class RouterBuilder implements IRouterBuilder {
    private readonly defaultRouteRegistrars;
    private readonly routeRegistrars;
    constructor();
    buildRoute(controllers: Controller[]): AppRouter;
    registerRouteHandler(method: string, registrar: RouterBuilderEndpointRegistrar): void;
}
