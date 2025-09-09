import { GmConfig } from "..";
import { IGmModuleClass } from "../core";
export declare class GmGenerateAbstractCrudDec {
    private config;
    private controllers;
    constructor(config: GmConfig, controllers: IGmModuleClass[]);
    run(): void;
}
