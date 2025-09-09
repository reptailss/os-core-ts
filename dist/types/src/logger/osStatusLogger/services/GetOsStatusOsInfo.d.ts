import { OsInfoService } from "../../../health";
import { OsStatusLoggerInfo } from "../../core";
export declare class GetOsStatusOsInfoService {
    private readonly osInfoService;
    constructor(osInfoService?: OsInfoService);
    getOsInfo(): Promise<OsStatusLoggerInfo>;
}
