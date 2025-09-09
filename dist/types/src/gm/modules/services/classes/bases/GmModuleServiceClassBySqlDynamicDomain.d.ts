import { GmModuleAbstractServiceClass, IGmModuleClass, IGmModuleClassMethod, IGmModuleModel } from "../../../../core";
import { GmConfig } from "../../../..";
export declare class GmModuleServiceClassBySqlDynamicDomain extends GmModuleAbstractServiceClass implements IGmModuleClass {
    private readonly model;
    private readonly modelType;
    constructor(config: GmConfig, serviceName: string);
    getModuleModel(): IGmModuleModel;
    addAndInitMethod(method: IGmModuleClassMethod, domainVarName: string): this;
    init(): void;
}
