import {
    AppFileArgControllerEndpoint,
    AppFilesArgControllerEndpoint,
    ArgControllerEndpoint,
    ControllerMeta,
} from '@controllers'
import {AppErrorKey, ErrorValue} from '@appError'
import {AppRequest} from '@appRequest'
import {AppResponse} from '@appResponse'

type ErrorHandler = {
    errors?: ErrorValue[]
    message: string
    errorKey: AppErrorKey
}


export interface IFormDataArgsEndpointsHandler {
    getFormDataEndpointArgs(args: ArgControllerEndpoint[]): Array<
        AppFileArgControllerEndpoint |
        AppFilesArgControllerEndpoint
    > | null
    
    handleFormDataArgs(
        fileArgs: Array<
            AppFileArgControllerEndpoint |
            AppFilesArgControllerEndpoint
        >,
        req: AppRequest,
        res: AppResponse,
    ): Promise<ErrorHandler | null>
}


export interface IArgEndpointsHandler {
    
    getDataByArgs(
        req: AppRequest,
        res: AppResponse,
        args: ArgControllerEndpoint[],
    ): Promise<any[]>
    
    
    getDataByControllerMethod<Data>(
        controller: ControllerMeta,
        methodName: string,
        req: AppRequest,
        res: AppResponse,
    ): Promise<Data>
}