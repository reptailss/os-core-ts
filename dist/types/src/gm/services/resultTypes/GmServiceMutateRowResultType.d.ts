import { GmAbstractServiceFn, GmExport, IGmService } from "../../core";
export declare class GmServiceMutateRowResultType extends GmAbstractServiceFn implements IGmService {
    getExport(): GmExport;
    getServiceName(): string;
    getMutateRowResultType(type: 'string' | 'number'): string;
}
