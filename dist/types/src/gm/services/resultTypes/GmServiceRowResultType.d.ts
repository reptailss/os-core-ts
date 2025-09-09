import { GmAbstractServiceFn, GmExport, IGmService } from "../../core";
export declare class GmServiceRowResultType extends GmAbstractServiceFn implements IGmService {
    getExport(): GmExport;
    getServiceName(): string;
    getRowResultType(baseType: string): string;
}
