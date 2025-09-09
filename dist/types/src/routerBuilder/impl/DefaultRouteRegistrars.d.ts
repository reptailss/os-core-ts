import { RouterBuilderEndpointRegistrar } from "..";
export declare class DefaultRouteRegistrars {
    getGetHandler(): RouterBuilderEndpointRegistrar;
    getPostHandler(): RouterBuilderEndpointRegistrar;
    getPutHandler(): RouterBuilderEndpointRegistrar;
    getDeleteHandler(): RouterBuilderEndpointRegistrar;
    private getDefaultControllerHandler;
    private getFormDataControllerHandler;
    private requestErrorHandler;
    private setHeadersControllerMethod;
}
