import { GmAbstractServiceFn, GmExport, IGmService } from "../../core";
export declare class GmServiceBuildResponseFormat extends GmAbstractServiceFn implements IGmService {
    getServiceName(): string;
    getExport(): GmExport;
    mutateRow(idVarName: String): string;
    row(rowVarName: string): string;
    pagination(paginationVarName: string): string;
}
