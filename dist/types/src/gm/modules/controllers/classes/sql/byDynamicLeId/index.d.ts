import { GmModuleAbstractControllerClass, IGmModuleClass } from "../../../../../core";
import { GmConfig } from "../../../../..";
export declare class GmModuleControllerClassCrudBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmModuleCreateDto;
    private readonly gmServiceSchemaValidatorType;
    private readonly gmServiceValidator;
    private readonly gmModuleUpdateDto;
    private readonly gmAccessStructureMethodProcessorByDynamicLeId;
    constructor(config: GmConfig);
    init(): void;
    private getValidatorVarName;
    private getValidatorCreateBodyVarName;
    private getValidatorCreateBodyTypeVarName;
    private getValidatorUpdateBodyVarName;
    private getValidatorUpdateBodyTypeVarName;
    private getValidatorParamsDtoVarName;
    private getServiceVarName;
}
export declare class GmModuleControllerClassCreateBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmModuleCreateDto;
    private readonly gmServiceSchemaValidatorType;
    private readonly gmServiceValidator;
    private readonly gmAccessStructureMethodProcessorByDynamicLeId;
    constructor(config: GmConfig);
    init(): void;
    private getValidatorVarName;
    private getValidatorCreateBodyVarName;
    private getValidatorCreateBodyTypeVarName;
    private getServiceVarName;
}
export declare class GmModuleControllerClassUpdateBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmModuleUpdateDto;
    private readonly gmServiceSchemaValidatorType;
    private readonly gmServiceValidator;
    private readonly gmAccessStructureMethodProcessorByDynamicLeId;
    constructor(config: GmConfig);
    init(): void;
    private getValidatorVarName;
    private getValidatorUpdateBodyVarName;
    private getValidatorUpdateBodyTypeVarName;
    private getServiceVarName;
}
export declare class GmModuleControllerClassDeleteBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly serviceCrud;
    private readonly gmAccessStructureMethodProcessorByDynamicLeId;
    constructor(config: GmConfig);
    init(): void;
    private getServiceVarName;
}
export declare class GmModuleControllerClassGetBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly serviceCrud;
    private readonly gmAccessStructureMethodProcessorByDynamicLeId;
    constructor(config: GmConfig);
    init(): void;
    private getServiceVarName;
}
export declare class GmModuleControllerClassGetAllBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmAccessStructureMethodProcessorByDynamicLeId;
    constructor(config: GmConfig);
    init(): void;
    private getValidatorVarName;
    private getValidatorParamsDtoVarName;
    private getServiceVarName;
}
