import { GmAbstractModuleConstant, IGmModule } from "../../core";
export declare class GmModuleDbConnectionSql extends GmAbstractModuleConstant implements IGmModule {
    getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    init(): void;
}
