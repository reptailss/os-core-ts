import { GmAbstractModuleClass, IGmModuleClass } from "../../../../core";
import { GmConfig } from "../../../..";
export declare abstract class GmModuleAbstractServiceClass extends GmAbstractModuleClass implements IGmModuleClass {
    private className;
    constructor(config: GmConfig, className: string);
    abstract init(): void;
    getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
}
