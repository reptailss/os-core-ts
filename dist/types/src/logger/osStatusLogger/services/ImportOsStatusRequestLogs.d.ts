export declare class ImportOsStatusRequestLogsService {
    private readonly getRequestsLogsService;
    private readonly clearRequestsLogsService;
    private readonly createRequestLogsService;
    private readonly BATCH_SIZE;
    import(): Promise<{
        count: number;
        importCount: number;
    }>;
    private importLogs;
    private saveLogsToFile;
}
