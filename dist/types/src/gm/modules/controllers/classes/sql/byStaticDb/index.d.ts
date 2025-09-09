import { GmModuleAbstractControllerClass, IGmModuleClass } from "../../../../../core";
import { GmConfig } from "../../../../..";
export declare class GmModuleControllerClassCrudBySqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmGetVarNames;
    private readonly gmAccessStructureMethodProcessorByStaticDb;
    private readonly gmValidatorBuilder;
    private readonly gmModuleCreateDto;
    private readonly gmModuleUpdateDto;
    constructor(config: GmConfig);
    init(): void;
    private getValidatorVarName;
    private getServiceVarName;
}
export declare class GmModuleControllerClassCreateBySqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmGetVarNames;
    private readonly gmAccessStructureMethodProcessorByStaticDb;
    private readonly gmValidatorBuilder;
    private readonly gmModuleCreateDto;
    constructor(config: GmConfig);
    init(): void;
    private getValidatorVarName;
    private getServiceVarName;
}
export declare class GmModuleControllerClassUpdateBySqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmGetVarNames;
    private readonly gmAccessStructureMethodProcessorByStaticDb;
    private readonly gmValidatorBuilder;
    private readonly gmModuleUpdateDto;
    constructor(config: GmConfig);
    init(): void;
    private getValidatorVarName;
    private getServiceVarName;
}
export declare class GmModuleControllerClassDeleteBySqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly serviceCrud;
    private readonly gmGetVarNames;
    private readonly gmAccessStructureMethodProcessorByStaticDb;
    constructor(config: GmConfig);
    init(): void;
    private getServiceVarName;
}
export declare class GmModuleControllerClassGetBySqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly serviceCrud;
    private readonly gmGetVarNames;
    private readonly gmAccessStructureMethodProcessorByStaticDb;
    constructor(config: GmConfig);
    init(): void;
    private getServiceVarName;
}
export declare class GmModuleControllerClassGetAllBySqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmGetVarNames;
    private readonly gmAccessStructureMethodProcessorByStaticDb;
    private readonly gmValidatorBuilder;
    constructor(config: GmConfig);
    init(): void;
    private getValidatorVarName;
    private getServiceVarName;
}
