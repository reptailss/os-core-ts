import { IRouterBuilder, RouterBuilderEndpointRegistrar } from "..";
import { ControllerMeta } from "../../controllers";
import { AppRouter } from "../../appRouter";
export declare class RouterBuilder implements IRouterBuilder {
    private readonly defaultRouteRegistrars;
    private readonly routeRegistrars;
    constructor();
    buildRoute(controllers: ControllerMeta[]): AppRouter;
    registerRouteHandler(method: string, registrar: RouterBuilderEndpointRegistrar): void;
}
