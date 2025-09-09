import { GetOsStatusOsInfoService } from "../../core";
export declare class ImportOsStatusInfoLogsService {
    private readonly getOsStatusOsInfoService;
    constructor(getOsStatusOsInfoService?: GetOsStatusOsInfoService);
    saveAndImport(): Promise<void>;
    import(): Promise<void>;
    private importLogs;
}
