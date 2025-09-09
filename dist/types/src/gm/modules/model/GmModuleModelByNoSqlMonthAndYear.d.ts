import { GmConfig } from "../..";
import { GmAbstractModuleFnModelNoSql, IGmModuleModel, IGmModuleModelApi } from "../../core";
export declare class GmModuleModelByNoSqlMonthAndYear extends GmAbstractModuleFnModelNoSql implements IGmModuleModel {
    private monthVarName;
    private yearVarName;
    private getModelCbVarName;
    api: IGmModuleModelApi;
    constructor(config: GmConfig, { modelVarName, getModelCbVarName, monthVarName, yearVarName, }: {
        modelVarName: string;
        getModelCbVarName: string;
        monthVarName: string;
        yearVarName: string;
    });
    getPropertyName(): string;
    getInitModel(): string;
    init(): void;
}
