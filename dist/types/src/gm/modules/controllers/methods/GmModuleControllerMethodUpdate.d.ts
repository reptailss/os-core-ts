import { GmAbstractModuleClassMethod, IGmModuleClassMethod, IGmModuleServiceApiUpdate } from "../../../core";
import { GmConfig } from "../../..";
export declare class GmModuleControllerMethodUpdate extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly api;
    private readonly varNames;
    private readonly gmServiceBuildResponseFormat;
    private readonly gmServiceMutateRowResultType;
    private readonly gmModuleUpdateDto;
    private readonly gmServiceUserInfoType;
    private readonly gmModuleRoutePaths;
    constructor(config: GmConfig, api: IGmModuleServiceApiUpdate, varNames: {
        updateDto: string;
        userInfo: string;
        updateDtoSchema: string;
        id: string;
        updateDtoType?: string;
    });
    getPropertyName(): string;
    init(): void;
    private getNewDtoPropertyVarName;
}
