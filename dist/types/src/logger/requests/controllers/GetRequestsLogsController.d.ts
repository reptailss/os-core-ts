import { FullUserInfo } from "../../../auth";
import { GetRequestsLogsService, ServerMeta } from "../../core";
export declare class GetRequestsLogsController {
    private readonly getRequestsLogsService;
    constructor(getRequestsLogsService?: GetRequestsLogsService);
    getLogs(userInfo: FullUserInfo): Promise<{
        rows: ServerMeta[];
        paths: string[];
    }>;
}
