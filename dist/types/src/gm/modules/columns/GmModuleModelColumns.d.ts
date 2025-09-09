import { GmAbstractModuleConstant, IGmModuleConstant } from "../../core";
export declare class GmModuleModelColumns extends GmAbstractModuleConstant implements IGmModuleConstant {
    getPropertyName(): string;
    getDirName(): string | null;
    getFileName(): string;
    init(): void;
    getColumnLibType(): "ModelNoSqlColumns" | "ModelSqlColumns";
    private gmGetColumnModelFromConfig;
}
