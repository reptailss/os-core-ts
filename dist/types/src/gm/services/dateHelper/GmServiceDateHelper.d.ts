import { GmAbstractServiceFn, GmExport, GmModuleConstructorProp, IGmService } from "../../core";
export declare class GmServiceDateHelper extends GmAbstractServiceFn implements IGmService {
    getServiceName(): string;
    getExport(): GmExport;
    getConstructorProp(): GmModuleConstructorProp | null;
    getCurrentMonth(): string;
    getCurrentYear(): string;
}
