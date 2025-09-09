import { GmExport, GmModuleConstructorProp, IGmServiceClass } from "../../core";
export declare abstract class GmAbstractServiceClass implements IGmServiceClass {
    serviceType: "class";
    abstract getServiceName(): string;
    abstract getExport(): GmExport;
    abstract getConstructorProp(): GmModuleConstructorProp;
}
