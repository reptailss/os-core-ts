import { GmAbstractModuleClassMethod, IGmModuleClassMethod, IGmModuleServiceApiCreate } from "../../../core";
import { GmConfig } from "../../..";
export declare class GmModuleControllerMethodCreate extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly api;
    private readonly varNames;
    private readonly gmServiceBuildResponseFormat;
    private readonly gmServiceMutateRowResultType;
    private readonly gmModuleCreateDto;
    private readonly gmServiceUserInfoType;
    private readonly gmModuleRoutePaths;
    constructor(config: GmConfig, api: IGmModuleServiceApiCreate, varNames: {
        createDto: string;
        userInfo: string;
        createDtoSchema: string;
        createDtoType?: string;
    });
    getPropertyName(): string;
    init(): void;
    private getNewDtoPropertyVarName;
}
