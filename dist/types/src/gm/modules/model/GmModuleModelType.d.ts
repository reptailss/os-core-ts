import { GmAbstractModuleType, IGmModuleType } from "../../core";
export declare class GmModuleModelType extends GmAbstractModuleType implements IGmModuleType {
    getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    init(): void;
    private getDtoName;
}
