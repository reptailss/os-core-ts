import { GmAbstractServiceFn, GmExport, IGmService } from "../../core";
export declare class GmServicePaginationNoSql extends GmAbstractServiceFn implements IGmService {
    getExport(): GmExport;
    getServiceName(): string;
    getPagination({ paramsVarName, dateStartVarName, dateEndVarName, getModelCbVarName, }: {
        paramsVarName: string;
        dateStartVarName: string;
        dateEndVarName: string;
        getModelCbVarName: string;
    }): string;
}
