import { GmModuleAbstractControllerClass, IGmModuleClass } from "../../../../../core";
import { GmConfig } from "../../../../..";
export declare class GmModuleControllerClassCrudBySqlDynamicDomain extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmAccessStructureMethodProcessorByDynamicDomain;
    constructor(config: GmConfig);
    init(): void;
    private getValidatorVarName;
    private getValidatorCreateDtoVarName;
    private getValidatorUpdateDtoVarName;
    private getValidatorParamsDtoVarName;
    private getServiceVarName;
}
export declare class GmModuleControllerClassCreateBySqlDynamicDomain extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmAccessStructureMethodProcessorByDynamicDomain;
    constructor(config: GmConfig);
    init(): void;
    private getValidatorVarName;
    private getValidatorCreateDtoVarName;
    private getServiceVarName;
}
export declare class GmModuleControllerClassUpdateBySqlDynamicDomain extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmAccessStructureMethodProcessorByDynamicDomain;
    constructor(config: GmConfig);
    init(): void;
    private getValidatorVarName;
    private getValidatorUpdateDtoVarName;
    private getServiceVarName;
}
export declare class GmModuleControllerClassDeleteBySqlDynamicDomain extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly serviceCrud;
    private readonly gmAccessStructureMethodProcessorByDynamicDomain;
    constructor(config: GmConfig);
    init(): void;
    private getServiceVarName;
}
export declare class GmModuleControllerClassGetBySqlDynamicDomain extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly serviceCrud;
    private readonly gmAccessStructureMethodProcessorByDynamicDomain;
    constructor(config: GmConfig);
    init(): void;
    private getServiceVarName;
}
export declare class GmModuleControllerClassGetAllBySqlDynamicDomain extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmAccessStructureMethodProcessorByDynamicDomain;
    constructor(config: GmConfig);
    init(): void;
    private getValidatorVarName;
    private getValidatorParamsDtoVarName;
    private getServiceVarName;
}
