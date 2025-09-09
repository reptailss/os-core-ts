import { ImportOsStatusInfoLogsService, ImportOsStatusRequestLogsService } from "../../core";
export declare class OsStatusLogsCron {
    private readonly importOsStatusRequestLogsService;
    private readonly importOsStatusInfoLogsService;
    private importOsStatusRequestLogsJob;
    private importOsStatusInfoLogsJob;
    constructor(importOsStatusRequestLogsService?: ImportOsStatusRequestLogsService, importOsStatusInfoLogsService?: ImportOsStatusInfoLogsService);
    start(): void;
    stop(): void;
}
