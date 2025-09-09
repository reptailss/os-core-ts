import { OsInfo } from "..";
export declare class OsInfoService {
    getOsInfo(): Promise<OsInfo>;
    private getCpuAverage;
    private sleep;
    private secNSec2ms;
    private calcMemory;
}
