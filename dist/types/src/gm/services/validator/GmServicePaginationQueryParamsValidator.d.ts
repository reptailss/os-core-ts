import { GmExport, IGmService } from "../../core";
export declare class GmServicePaginationQueryParamsValidator implements IGmService {
    serviceType: "fn";
    getExport(): GmExport;
    getServiceName(): string;
    getSchema(dtoSchema: string): string;
}
