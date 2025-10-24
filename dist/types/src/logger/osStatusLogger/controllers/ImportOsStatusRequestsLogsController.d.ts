import { FullUserDto } from "../../../auth";
import { ImportResult } from "../../../responseFormat";
export declare class ImportOsStatusRequestsLogsController {
    private readonly importOsStatusRequestLogsService;
    import(user: FullUserDto): Promise<ImportResult>;
}
