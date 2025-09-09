import { ServerMeta } from "../../core";
export declare class GetRequestsLogsService {
    getRequestsLogs(): Promise<ServerMeta[]>;
    getSyncRequests(): ServerMeta[];
}
