import { GmModuleAbstractControllerClass, IGmModuleClass } from "../../../../../core";
import { GmConfig } from "../../../../..";
export declare class GmModuleControllerClassCrudByNoSqlMonthAndYear extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmServiceDateHelper;
    private readonly gmGetVarNames;
    private readonly gmAccessStructureMethodProcessorByMonthAndYear;
    private readonly gmValidatorBuilder;
    private readonly gmModuleCreateDto;
    constructor(config: GmConfig);
    init(): void;
    private getValidatorVarName;
    private getServiceVarName;
}
export declare class GmModuleControllerClassCreateByNoSqlMonthAndYear extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmServiceDateHelper;
    private readonly gmGetVarNames;
    private readonly gmAccessStructureMethodProcessorByMonthAndYear;
    private readonly gmValidatorBuilder;
    private readonly gmModuleCreateDto;
    constructor(config: GmConfig);
    init(): void;
    private getValidatorVarName;
    private getServiceVarName;
}
export declare class GmModuleControllerClassGetAllByNoSqlMonthAndYear extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmGetVarNames;
    private readonly gmAccessStructureMethodProcessorByMonthAndYear;
    private readonly gmValidatorBuilder;
    constructor(config: GmConfig);
    init(): void;
    private getValidatorVarName;
    private getServiceVarName;
}
