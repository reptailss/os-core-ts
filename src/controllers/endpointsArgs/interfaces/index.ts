import {
    AppFileArgControllerEndpoint,
    AppFilesArgControllerEndpoint,
    ArgControllerEndpoint,
    Controller,
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
    
    handleFormDataArgs(props: {
        fileArgs: Array<
            AppFileArgControllerEndpoint |
            AppFilesArgControllerEndpoint
        >
        req: AppRequest,
        res: AppResponse,
    }): Promise<ErrorHandler | null>
}


export interface IArgEndpointsHandler {
    
    getDataByArgs(props: {
        req: AppRequest,
        res: AppResponse,
        args: ArgControllerEndpoint[]
    }): Promise<any[]>
    
    
    getDataByControllerMethod<Data>(
        controller: Controller,
        methodName: string,
        req: AppRequest,
        res: AppResponse,
    ): Promise<Data>
}