import { GmAbstractServiceFn, GmExport, IGmService } from "../../core";
export declare class GmServicePaginationValuesType extends GmAbstractServiceFn implements IGmService {
    getExport(): GmExport;
    getServiceName(): string;
    getPaginationValuesType(dtoType: string): string;
}
