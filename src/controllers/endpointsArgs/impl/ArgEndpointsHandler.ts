import {ArgControllerEndpoint, ArgsResolver, ControllerMeta, IArgEndpointsHandler} from '@controllers'
import {AppRequest} from '@appRequest'
import {AppResponse} from '@appResponse'


export class ArgEndpointsHandler implements IArgEndpointsHandler {
    
    public async getDataByControllerMethod<Data>(
        controller: ControllerMeta,
        methodName: string,
        req: AppRequest,
        res: AppResponse,
    ): Promise<Data> {
        const args = await this.getDataByArgs(
            req,
            res,
            controller.args[methodName] || [],
        )
        //@ts-ignore
        return controller[methodName].apply(controller, args)
    }
    
    public async getDataByArgs(
        req: AppRequest,
        res: AppResponse,
        args: ArgControllerEndpoint[],
    ): Promise<any[]> {
        const data: any[] = []
        for (const arg of args) {
            type ArgKey = typeof arg['key']
            const handler = ArgsResolver[arg.key] as ((
                req: AppRequest,
                res: AppResponse,
                arg: Extract<ArgControllerEndpoint, {key: ArgKey}>,
            ) => Promise<any> | any)
            if (!handler) {
                data.push(null)
                continue
            }
            const currentData = await handler(
                req,
                res,
                arg,
            )
            data.push(currentData)
        }
        return data
    }
}