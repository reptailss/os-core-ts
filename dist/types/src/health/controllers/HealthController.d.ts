import { FullUserInfo } from "../../auth";
import { ReadinessService } from "../core";
import { OsInfo, OsInfoService, ReadinessInfo } from "..";
export declare class HealthController {
    private readonly osInfoService;
    private readonly readinessService;
    constructor(osInfoService?: OsInfoService, readinessService?: ReadinessService);
    liveness(user: FullUserInfo): {
        status: 'ok';
        code: 200;
    };
    osStatus(user: FullUserInfo): Promise<OsInfo>;
    readiness(user: FullUserInfo): Promise<{
        code: 200 | 500;
        status: 'ok' | 'bad';
        info: ReadinessInfo;
    }>;
}
