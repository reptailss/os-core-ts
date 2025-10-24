import { AppFileArgControllerEndpoint, AppFilesArgControllerEndpoint, ArgControllerEndpoint, IFormDataArgsEndpointsHandler } from "../..";
import { AppErrorKey, ErrorValue } from "../../../appError";
import { AppRequest } from "../../../appRequest";
import { AppResponse } from "../../../appResponse";
type ErrorHandler = {
    errors?: ErrorValue[];
    message: string;
    errorKey: AppErrorKey;
};
export declare class FormDataArgsEndpointsHandler implements IFormDataArgsEndpointsHandler {
    getFormDataEndpointArgs(args: ArgControllerEndpoint[]): Array<AppFileArgControllerEndpoint | AppFilesArgControllerEndpoint> | null;
    handleFormDataArgs(fileArgs: Array<AppFileArgControllerEndpoint | AppFilesArgControllerEndpoint>, req: AppRequest, res: AppResponse): Promise<ErrorHandler | null>;
}
export {};
