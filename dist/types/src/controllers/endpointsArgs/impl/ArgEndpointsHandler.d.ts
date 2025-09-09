import { ArgControllerEndpoint, Controller, IArgEndpointsHandler } from "../..";
import { AppRequest } from "../../../appRequest";
import { AppResponse } from "../../../appResponse";
export declare class ArgEndpointsHandler implements IArgEndpointsHandler {
    getDataByControllerMethod<Data>(controller: Controller, methodName: string, req: AppRequest, res: AppResponse): Promise<Data>;
    getDataByArgs(props: {
        req: AppRequest;
        res: AppResponse;
        args: ArgControllerEndpoint[];
    }): Promise<any[]>;
    private getDataByArg;
    private validationBySchema;
    private validationPrimitiveBySchema;
}
