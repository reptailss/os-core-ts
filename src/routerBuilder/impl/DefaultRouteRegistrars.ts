import {RouterBuilderEndpointRegistrar} from '@routerBuilder'
import {
    AppFileArgControllerEndpoint,
    AppFilesArgControllerEndpoint,
    ArgEndpointsHandler,
    Controller,
    ControllerEndpoint,
    ControllersHelper,
    FormDataArgsEndpointsHandler,
    IArgEndpointsHandler,
    IFormDataArgsEndpointsHandler,
    SendFileControllerEndpoint,
    SystemControllerEndpoint,
} from '@controllers'
import {AppRouterRequestHandler} from '@appRouter'
import {AppError, AppErrorHelper} from '@appError'
import {BuildResponseFormat} from '@responseFormat'
import {AppResponse} from '@appResponse'
import {appLogger} from '@logger'

const formDataArgsEndpointsHandler: IFormDataArgsEndpointsHandler = new FormDataArgsEndpointsHandler()
const argEndpointsHandler: IArgEndpointsHandler = new ArgEndpointsHandler()

export class DefaultRouteRegistrars {
    
    public getGetHandler(): RouterBuilderEndpointRegistrar {
        return (router, endpoint, controller) => {
            router.get(
                ControllersHelper.buildEndpointUrl({
                    endpointPath: endpoint.path,
                    isSystemEndpoint: endpoint.type === 'system',
                }),
                this.getDefaultControllerHandler(
                    endpoint,
                    controller,
                ),
            )
        }
    }
    
    public getPostHandler(): RouterBuilderEndpointRegistrar {
        return (router, endpoint, controller) => {
            const formDataArgs = formDataArgsEndpointsHandler.getFormDataEndpointArgs(controller.args[endpoint._propertyKey] || [])
            if (formDataArgs) {
                router.post(
                    ControllersHelper.buildEndpointUrl({
                        endpointPath: endpoint.path,
                        isSystemEndpoint: endpoint.type === 'system',
                    }),
                    this.getFormDataControllerHandler(formDataArgs),
                    this.getDefaultControllerHandler(endpoint, controller),
                )
                return
            }
            router.post(
                ControllersHelper.buildEndpointUrl({
                    endpointPath: endpoint.path,
                    isSystemEndpoint: endpoint.type === 'system',
                }),
                this.getDefaultControllerHandler(endpoint, controller),
            )
        }
    }
    
    public getPutHandler(): RouterBuilderEndpointRegistrar {
        return (router, endpoint, controller) => {
            const formDataArgs = formDataArgsEndpointsHandler.getFormDataEndpointArgs(controller.args[endpoint._propertyKey] || [])
            if (formDataArgs) {
                router.put(
                    ControllersHelper.buildEndpointUrl({
                        endpointPath: endpoint.path,
                        isSystemEndpoint: endpoint.type === 'system',
                    }),
                    this.getFormDataControllerHandler(formDataArgs),
                    this.getDefaultControllerHandler(endpoint, controller),
                )
                return
            }
            router.put(
                ControllersHelper.buildEndpointUrl({
                    endpointPath: endpoint.path,
                    isSystemEndpoint: endpoint.type === 'system',
                }),
                this.getDefaultControllerHandler(endpoint, controller),
            )
        }
    }
    
    public getDeleteHandler(): RouterBuilderEndpointRegistrar {
        return (router, endpoint, controller) => {
            router.delete(
                ControllersHelper.buildEndpointUrl({
                    endpointPath: endpoint.path,
                    isSystemEndpoint: endpoint.type === 'system',
                }),
                this.getDefaultControllerHandler(endpoint, controller),
            )
        }
    }
    
    
    private getDefaultControllerHandler(
        endpoint: ControllerEndpoint | SystemControllerEndpoint | SendFileControllerEndpoint,
        controller: Controller,
    ): AppRouterRequestHandler {
        const args = controller.args[endpoint._propertyKey]
        
        return async (req, res, next) => {
            this.setHeadersControllerMethod(controller, endpoint._propertyKey, res)
            
            try {
                const data = await argEndpointsHandler.getDataByControllerMethod(controller, endpoint._propertyKey, req, res)
                
                if (!!args?.find((arg) => arg.key === 'AppResponse')) {
                    return
                }
                if (endpoint.type === 'sendFileByPath') {
                    return res.sendFile(data as string, {
                        root: endpoint.options?.root,
                    })
                }
                if (endpoint.type !== 'sendFile') {
                    res._body = data as object
                }
                res.send(data)
            } catch (error) {
                this.requestErrorHandler(error, res)
            }
        }
        
    }
    
    
    private getFormDataControllerHandler(
        args: Array<
            AppFileArgControllerEndpoint |
            AppFilesArgControllerEndpoint
        >,
    ): AppRouterRequestHandler {
        return async (
            req,
            res,
            next,
        ): Promise<void> => {
            const errors = await formDataArgsEndpointsHandler.handleFormDataArgs({
                fileArgs: args,
                req,
                res,
            })
            if (errors) {
                const errorProps = AppErrorHelper.getAppErrorCodeAndStatus({
                    errorCode: errors.errorKey,
                })
                
                res.status(400).send(BuildResponseFormat.errors({
                    errors: errors.errors || [],
                    errorCode: errorProps.errorCode,
                    statusCode: errorProps.statusCode,
                }))
                return
            }
            next()
        }
    }
    
    
    private requestErrorHandler(
        error: unknown,
        res: AppResponse,
    ): void {
        
        const errorResult = AppErrorHelper.buildErrorResultFromError(error)
        if (!(error instanceof AppError)) {
            appLogger.error('Unexpected error:', error)
        }
        res._body = {
            error: true,
            status: errorResult.status,
            errors: errorResult.errors,
            error_code: errorResult.error_code,
        }
        
        res.status(errorResult.status).send(errorResult)
    }
    
    private setHeadersControllerMethod(
        controller: Controller,
        methodName: string,
        res: AppResponse,
    ): void {
        if (
            controller.headers &&
            methodName in controller.headers &&
            controller.headers[methodName]
        ) {
            const headers = controller.headers[methodName]
            for (const key in headers) {
                res.setHeader(key, headers[key])
            }
        }
    }
}