import { GmAbstractModuleFnModelSql, IGmModuleModel, IGmModuleModelApi } from "../../core";
import { GmConfig } from "../..";
export declare class GmModuleModelSqlByDynamicLeId extends GmAbstractModuleFnModelSql implements IGmModuleModel {
    api: IGmModuleModelApi;
    private getModelCbVarName;
    private leIdVarName;
    constructor(config: GmConfig, { modelVarName, getModelCbVarName, leIdVarName, }: {
        modelVarName: string;
        getModelCbVarName: string;
        leIdVarName: string;
    });
    getPropertyName(): string;
    getInitModel(): string;
    init(): void;
}
