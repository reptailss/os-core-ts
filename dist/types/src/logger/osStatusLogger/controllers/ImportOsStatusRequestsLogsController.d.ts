import { ImportOsStatusRequestLogsService } from "../../core";
import { FullUserInfo } from "../../../auth";
import { ImportResult } from "../../../responseFormat";
export declare class ImportOsStatusRequestsLogsController {
    private readonly importOsStatusRequestLogsService;
    constructor(importOsStatusRequestLogsService?: ImportOsStatusRequestLogsService);
    import(user: FullUserInfo): Promise<ImportResult>;
}
