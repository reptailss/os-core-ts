import { ControllerMeta, ControllerEndpoint, SendFileControllerEndpoint, SystemControllerEndpoint } from "../../controllers";
import { AppRouter } from "../../appRouter";
export type RouterBuilderEndpointRegistrar = (router: AppRouter, endpoint: ControllerEndpoint | SystemControllerEndpoint | SendFileControllerEndpoint, controller: ControllerMeta) => void;
export interface IRouterBuilder {
    buildRoute(controllers: ControllerMeta[]): AppRouter;
    registerRouteHandler(method: string, registrar: RouterBuilderEndpointRegistrar): void;
}
