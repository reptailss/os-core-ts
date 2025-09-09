import { GmConfig } from "../..";
import { GmAbstractModuleConstantModelSql, IGmModuleModel, IGmModuleModelApi } from "../../core";
export declare class GmModuleModelSqlByStaticDb extends GmAbstractModuleConstantModelSql implements IGmModuleModel {
    api: IGmModuleModelApi;
    private gmModuleDbConnectionSql;
    constructor(config: GmConfig, modelVarName: string);
    getPropertyName(): string;
    init(): void;
}
