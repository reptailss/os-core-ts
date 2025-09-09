import { GmAbstractModuleClassMethod, IGmModuleClassMethod, IGmModuleServiceApiDelete } from "../../../core";
import { GmConfig } from "../../..";
export declare class GmModuleControllerMethodDelete extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly api;
    private readonly varNames;
    private readonly gmServiceBuildResponseFormat;
    private readonly gmServiceMutateRowResultType;
    private readonly gmServiceUserInfoType;
    private readonly gmModuleRoutePaths;
    constructor(config: GmConfig, api: IGmModuleServiceApiDelete, varNames: {
        userInfo: string;
        id: string;
    });
    getPropertyName(): string;
    init(): void;
    private getOldDtoPropertyVarName;
}
