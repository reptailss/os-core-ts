import { AppRequest } from "../../../appRequest";
import { AppResponse } from "../../../appResponse";
import { ArgControllerEndpoint } from "../..";
type ArgsMapResolver = {
    [K in ArgControllerEndpoint['key']]: (req: AppRequest, res: AppResponse, arg: Extract<ArgControllerEndpoint, {
        key: K;
    }>) => Promise<any> | any;
};
export declare const ArgsResolver: ArgsMapResolver;
export {};
