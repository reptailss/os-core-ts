import { GmModuleAbstractServiceClass, GmModuleServiceClass, IGmModuleModel } from "../../../../core";
import { GmConfig } from "../../../..";
export declare class GmModuleServiceClassBySqlStaticDb extends GmModuleAbstractServiceClass implements GmModuleServiceClass {
    private readonly model;
    private readonly modelType;
    constructor(config: GmConfig, className: string);
    getModuleModel(): IGmModuleModel;
    init(): void;
}
