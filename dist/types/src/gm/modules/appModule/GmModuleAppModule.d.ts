import { GmAbstractModuleConstant, IGmModuleClass, IGmModuleConstant } from "../../core";
import { GmConfig } from "../..";
export declare class GmModuleAppModule extends GmAbstractModuleConstant implements IGmModuleConstant {
    private controllers;
    constructor(config: GmConfig, controllers: IGmModuleClass[]);
    getPropertyName(): string;
    getDirName(): string | null;
    getFileName(): string;
    init(): void;
}
