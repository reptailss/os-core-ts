import { GmAbstractModuleFnModelSql, IGmModuleModel, IGmModuleModelApi } from "../../core";
import { GmConfig } from "../..";
export declare class GmModuleModelSqlByDynamicDomain extends GmAbstractModuleFnModelSql implements IGmModuleModel {
    api: IGmModuleModelApi;
    private getModelCbVarName;
    private domainVarName;
    constructor(config: GmConfig, { modelVarName, domainVarName, getModelCbVarName, }: {
        modelVarName: string;
        getModelCbVarName: string;
        domainVarName: string;
    });
    getPropertyName(): string;
    getInitModel(): string;
    init(): void;
}
