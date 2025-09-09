import { GmExport, IGmServiceFn } from "../../core";
export declare abstract class GmAbstractServiceFn implements IGmServiceFn {
    serviceType: "fn";
    abstract getServiceName(): string;
    abstract getExport(): GmExport;
}
