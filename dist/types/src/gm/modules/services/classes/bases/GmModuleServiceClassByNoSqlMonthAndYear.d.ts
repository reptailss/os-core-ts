import { GmModuleAbstractServiceClass, IGmModuleClass, IGmModuleClassMethod, IGmModuleModel } from "../../../../core";
import { GmConfig } from "../../../..";
export declare class GmModuleServiceClassByNoSqlMonthAndYear extends GmModuleAbstractServiceClass implements IGmModuleClass {
    private readonly model;
    private readonly modelType;
    private readonly gmServiceDateHelper;
    constructor(config: GmConfig, className: string);
    getModuleModel(): IGmModuleModel;
    addAndInitMethod(method: IGmModuleClassMethod, monthVarName: string, yearVarName: string): this;
    renderInitModel(): string;
    init(): void;
}
