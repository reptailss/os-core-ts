import { GmAbstractModuleFn, IGmModuleFn } from "../../../core";
import { GmConfig } from "../../..";
export declare abstract class GmAbstractModuleFnModelSql extends GmAbstractModuleFn implements IGmModuleFn {
    private readonly modelType;
    private readonly gmModuleModelColumns;
    private readonly gmModuleTableName;
    private readonly gmModuleDto;
    constructor(config: GmConfig);
    abstract getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    init(): void;
    getTableNamePropertyName(): string;
    getColumnsPropertyName(): string;
    getModelTypePropertyName(): string;
    private getTableName;
}
