import { ClearRequestsLogsService, CreateRequestLogsService, GetRequestsLogsService } from "../../core";
export declare class ImportOsStatusRequestLogsService {
    private readonly getRequestsLogsService;
    private readonly clearRequestsLogsService;
    private readonly createRequestLogsService;
    private readonly BATCH_SIZE;
    constructor(getRequestsLogsService?: GetRequestsLogsService, clearRequestsLogsService?: ClearRequestsLogsService, createRequestLogsService?: CreateRequestLogsService);
    import(): Promise<{
        count: number;
        importCount: number;
    }>;
    private importLogs;
    private saveLogsToFile;
}
