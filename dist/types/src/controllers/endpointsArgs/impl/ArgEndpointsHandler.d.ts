import { ArgControllerEndpoint, ControllerMeta, IArgEndpointsHandler } from "../..";
import { AppRequest } from "../../../appRequest";
import { AppResponse } from "../../../appResponse";
export declare class ArgEndpointsHandler implements IArgEndpointsHandler {
    getDataByControllerMethod<Data>(controller: ControllerMeta, methodName: string, req: AppRequest, res: AppResponse): Promise<Data>;
    getDataByArgs(req: AppRequest, res: AppResponse, args: ArgControllerEndpoint[]): Promise<any[]>;
}
