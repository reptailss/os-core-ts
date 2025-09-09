import { IGmModuleModelApi } from "../../../core";
export declare class GmModuleModeApiNoSql implements IGmModuleModelApi {
    private readonly modelVarName;
    constructor(modelVarName: string);
    create(createDtoVarName: string): string;
    update(updateDtoVarName: string, props: {
        filters: Record<string, string>;
        returning: boolean;
    }): string;
    destroy(props: {
        filters: Record<string, string>;
    }): string;
    findOne(props: {
        filters: Record<string, string>;
    }): string;
    findByPk(idVarName: string): string;
    pagination(paramsVarName: string): string;
    getConfig(): string;
    getModelVarName(): string;
}
