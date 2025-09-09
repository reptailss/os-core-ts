import { GmAbstractModuleClassMethod, IGmModuleClassMethod, IGmModuleServiceApiGet } from "../../../core";
import { GmConfig } from "../../..";
export declare class GmModuleControllerMethodGetById extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly api;
    private readonly varNames;
    private readonly gmServiceBuildResponseFormat;
    private readonly gmServiceRowResultType;
    private readonly gmServiceThrowAppError;
    private readonly gmModuleDto;
    private readonly gmServiceUserInfoType;
    private readonly gmModuleRoutePaths;
    constructor(config: GmConfig, api: IGmModuleServiceApiGet, varNames: {
        userInfo: string;
        id: string;
    });
    getPropertyName(): string;
    init(): void;
    private getDtoPropertyVarName;
}
