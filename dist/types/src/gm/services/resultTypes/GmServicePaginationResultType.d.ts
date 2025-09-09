import { GmAbstractServiceFn, GmExport, IGmService } from "../../core";
export declare class GmServicePaginationValues extends GmAbstractServiceFn implements IGmService {
    getExport(): GmExport;
    getServiceName(): string;
    getPaginationResultType(dtoType: string): string;
}
