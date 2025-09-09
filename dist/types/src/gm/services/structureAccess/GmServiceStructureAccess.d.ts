import { GmAbstractServiceFn, GmExport, IGmService } from "../../core";
export declare class GmServiceStructureAccess extends GmAbstractServiceFn implements IGmService {
    getServiceName(): string;
    getExport(): GmExport;
    checkAccess(checkStructureAccessPropsVarName: String): string;
}
