import { Controller, ControllerEndpoint, SendFileControllerEndpoint, SystemControllerEndpoint } from "../../controllers";
import { AppRouter } from "../../appRouter";
export type RouterBuilderEndpointRegistrar = (router: AppRouter, endpoint: ControllerEndpoint | SystemControllerEndpoint | SendFileControllerEndpoint, controller: Controller) => void;
export interface IRouterBuilder {
    buildRoute(controllers: Controller[]): AppRouter;
    registerRouteHandler(method: string, registrar: RouterBuilderEndpointRegistrar): void;
}
