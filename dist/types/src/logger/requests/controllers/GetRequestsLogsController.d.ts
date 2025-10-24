import { FullUserDto } from "../../../auth";
import { ServerMeta } from "../../core";
export declare class GetRequestsLogsController {
    private readonly getRequestsLogsService;
    getLogs(userDto: FullUserDto): Promise<{
        rows: ServerMeta[];
        paths: string[];
    }>;
}
