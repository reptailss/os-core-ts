import { GmAbstractServiceFn, GmExport, IGmService } from "../../core";
export declare class GmServicePaginationQueryParamsType extends GmAbstractServiceFn implements IGmService {
    getExport(): GmExport;
    getServiceName(): string;
    getPaginationQueryParamsType(dtoType: string): string;
}
