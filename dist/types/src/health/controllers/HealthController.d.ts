import { FullUserDto } from "../../auth";
import { OsInfo, ReadinessInfo } from "..";
export declare class HealthController {
    private readonly osInfoService;
    private readonly readinessService;
    liveness(userDto: FullUserDto): {
        status: 'ok';
        code: 200;
    };
    osStatus(userDto: FullUserDto): Promise<OsInfo>;
    readiness(userDto: FullUserDto): Promise<{
        code: 200 | 500;
        status: 'ok' | 'bad';
        info: ReadinessInfo;
    }>;
}
