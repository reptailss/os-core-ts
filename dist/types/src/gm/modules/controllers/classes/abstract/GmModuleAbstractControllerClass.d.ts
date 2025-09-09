import { GmAbstractModuleClass, IGmModuleClass } from "../../../../core";
import { GmConfig } from "../../../..";
export declare abstract class GmModuleAbstractControllerClass extends GmAbstractModuleClass implements IGmModuleClass {
    private className;
    constructor(config: GmConfig, className: string);
    getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    init(): void;
}
