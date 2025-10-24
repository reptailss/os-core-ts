export declare class OsStatusLogsCron {
    private readonly importOsStatusRequestLogsJob;
    private readonly importOsStatusInfoLogsJob;
    private readonly importOsStatusRequestLogsService;
    private readonly importOsStatusInfoLogsService;
    constructor();
    start(): void;
    stop(): void;
}
