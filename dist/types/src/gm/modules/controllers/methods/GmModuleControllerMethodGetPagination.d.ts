import { GmAbstractModuleClassMethod, IGmModuleClassMethod, IGmModuleServiceApiGetPagination } from "../../../core";
import { GmConfig } from "../../..";
export declare class GmModuleControllerMethodGetPagination extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly api;
    private readonly varNames;
    private readonly gmServiceBuildResponseFormat;
    private readonly gmServicePaginationValues;
    private readonly gmServicePaginationQueryParamsType;
    private readonly gmModuleDto;
    private readonly gmServiceUserInfoType;
    private readonly gmModuleRoutePaths;
    constructor(config: GmConfig, api: IGmModuleServiceApiGetPagination, varNames: {
        userInfo: string;
        params: string;
        paramsSchema: string;
    });
    getPropertyName(): string;
    init(): void;
    private getPaginationValuesVarName;
}
