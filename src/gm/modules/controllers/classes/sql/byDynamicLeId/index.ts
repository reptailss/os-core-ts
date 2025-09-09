import {
    GmAccessStructureMethodProcessor,
    GmConfigChecker,
    GmModuleAbstractControllerClass,
    GmModuleControllerMethodCreate,
    GmModuleControllerMethodDelete,
    GmModuleControllerMethodGetById,
    GmModuleControllerMethodGetPagination,
    GmModuleControllerMethodUpdate,
    GmModuleCreateDto,
    GmModuleServiceClassCreateBySqlDynamicLeId,
    GmModuleServiceClassCrudBySqlDynamicLeId,
    GmModuleServiceClassDeleteBySqlDynamicLeId,
    GmModuleServiceClassGetAllBySqlDynamicLeId,
    GmModuleServiceClassGetBySqlDynamicLeId,
    GmModuleServiceClassUpdateBySqlDynamicLeId,
    GmModuleUpdateDto,
    GmModuleValidator,
    GmQueryParamNumDec,
    GmServiceSchemaValidatorType,
    GmServiceValidator,
    IGmModuleClass,
} from '@gm/core'
import {GmConfig} from '@gm'
import {StringCaseHelper} from '@helpers'


const CREATE_VAR_NAMES = {
    body: 'body',
    createDtoSchema: 'createDtoSchema',
    userInfo: 'userInfo',
} as const

const UPDATE_VAR_NAMES = {
    body: 'body',
    updateDtoSchema: 'createDtoSchema',
    userInfo: 'userInfo',
    id: 'id',
} as const

const DELETE_VAR_NAMES = {
    legalEntityId: 'legalEntityId',
    userInfo: 'userInfo',
    id: 'id',
} as const

const GET_VAR_NAMES = {
    legalEntityId: 'legalEntityId',
    userInfo: 'userInfo',
    id: 'id',
} as const

const GET_ALL_VAR_NAMES = {
    legalEntityId: 'legalEntityId',
    params: 'params',
    userInfo: 'userInfo',
} as const


class GmAccessStructureMethodProcessorByDynamicLeId extends GmAccessStructureMethodProcessor {
    constructor(config: GmConfig) {
        super(config, {
            add: {
                openUserId: `${CREATE_VAR_NAMES.userInfo}.open_user_id`,
                legalEntityId: `${CREATE_VAR_NAMES.body}.legal_entity_id`,
            },
            update: {
                openUserId: `${UPDATE_VAR_NAMES.userInfo}.open_user_id`,
                legalEntityId: `${UPDATE_VAR_NAMES.body}.legal_entity_id`,
            },
            delete: {
                openUserId: `${DELETE_VAR_NAMES.userInfo}.open_user_id`,
                legalEntityId: DELETE_VAR_NAMES.legalEntityId,
            },
            get: {
                openUserId: `${GET_VAR_NAMES.userInfo}.open_user_id`,
                legalEntityId: GET_VAR_NAMES.legalEntityId,
            },
            list: {
                openUserId: `${GET_ALL_VAR_NAMES.userInfo}.open_user_id`,
                legalEntityId: GET_ALL_VAR_NAMES.legalEntityId,
            },
        })
    }
}

export class GmModuleControllerClassCrudBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {


    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassCrudBySqlDynamicLeId
    private readonly gmModuleCreateDto: GmModuleCreateDto
    private readonly gmServiceSchemaValidatorType: GmServiceSchemaValidatorType
    private readonly gmServiceValidator: GmServiceValidator
    private readonly gmModuleUpdateDto: GmModuleUpdateDto
    private readonly gmAccessStructureMethodProcessorByDynamicLeId: GmAccessStructureMethodProcessorByDynamicLeId

    constructor(config: GmConfig,
    ) {
        super(
            config,
            `${StringCaseHelper.toPascalCase(config.dtoName.plural)}Controller`,
        )
        this.validator = new GmModuleValidator(
            config,
            this.getValidatorVarName(),
        )
        this.serviceCrud = new GmModuleServiceClassCrudBySqlDynamicLeId(
            config,
            `this.${this.getServiceVarName()}`,
            {
                create: {
                    legalEntityId: `${CREATE_VAR_NAMES.body}.legal_entity_id`,
                    createDto: CREATE_VAR_NAMES.body,
                    initiatorOpenUserId: `${CREATE_VAR_NAMES.userInfo}.open_user_id`,
                },
                update: {
                    legalEntityId: `${UPDATE_VAR_NAMES.body}.legal_entity_id`,
                    id: UPDATE_VAR_NAMES.id,
                    updateDto: UPDATE_VAR_NAMES.body,
                    initiatorOpenUserId: `${UPDATE_VAR_NAMES.userInfo}.open_user_id`,
                },
                delete: {
                    legalEntityId: DELETE_VAR_NAMES.legalEntityId,
                    id: DELETE_VAR_NAMES.id,
                    initiatorOpenUserId: `${DELETE_VAR_NAMES.userInfo}.open_user_id`,
                },
                getById: {
                    legalEntityId: GET_VAR_NAMES.legalEntityId,
                    id: GET_VAR_NAMES.id,
                },
                getPagination: {
                    legalEntityId: GET_ALL_VAR_NAMES.legalEntityId,
                    params: GET_ALL_VAR_NAMES.params,
                },
            },
        )
        this.gmModuleCreateDto = new GmModuleCreateDto(config)
        this.gmServiceSchemaValidatorType = new GmServiceSchemaValidatorType()
        this.gmServiceValidator = new GmServiceValidator()
        this.gmModuleUpdateDto = new GmModuleUpdateDto(config)
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config)

    }

    public init(): void {
        super.init()
        this.addModule(this.validator)
        this.addModule(this.serviceCrud)
        this.addModule(this.gmModuleCreateDto)
        this.addModule(this.gmModuleUpdateDto)
        this.addService(this.gmServiceSchemaValidatorType)
        this.addService(this.gmServiceValidator)

        const methodCreate = new GmModuleControllerMethodCreate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                createDto: CREATE_VAR_NAMES.body,
                userInfo: CREATE_VAR_NAMES.userInfo,
                createDtoSchema: this.getValidatorCreateBodyVarName(),
                createDtoType: this.getValidatorCreateBodyTypeVarName(),
            },
        )
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.add(methodCreate)
        }
        const methodUpdate = new GmModuleControllerMethodUpdate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                updateDto: UPDATE_VAR_NAMES.body,
                userInfo: UPDATE_VAR_NAMES.userInfo,
                updateDtoSchema: this.getValidatorUpdateBodyVarName(),
                updateDtoType: this.getValidatorUpdateBodyTypeVarName(),
                id: UPDATE_VAR_NAMES.id,
            },
        )
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'update')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.update(methodUpdate)
        }
        const methodDelete = new GmModuleControllerMethodDelete(
            this.getConfig(),
            this.serviceCrud.api,
            {
                userInfo: DELETE_VAR_NAMES.userInfo,
                id: DELETE_VAR_NAMES.id,
            },
        ).addProp({
            varName: DELETE_VAR_NAMES.legalEntityId,
            callVarName: DELETE_VAR_NAMES.legalEntityId,
            type: 'number',
            decorator: new GmQueryParamNumDec('legal_entity_id'),
        })
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'delete')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.delete(methodDelete)
        }
        const methodGetById = new GmModuleControllerMethodGetById(
            this.getConfig(),
            this.serviceCrud.api,
            {
                userInfo: GET_VAR_NAMES.userInfo,
                id: GET_VAR_NAMES.id,
            },
        ).addProp({
            varName: GET_VAR_NAMES.legalEntityId,
            callVarName: GET_VAR_NAMES.legalEntityId,
            type: 'number',
            decorator: new GmQueryParamNumDec('legal_entity_id'),
        })
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'get')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.get(methodGetById)
        }
        const methodPagination = new GmModuleControllerMethodGetPagination(
            this.getConfig(),
            this.serviceCrud.api,
            {
                params: GET_ALL_VAR_NAMES.params,
                userInfo: GET_ALL_VAR_NAMES.userInfo,
                paramsSchema: this.getValidatorParamsDtoVarName(),
            },
        ).addProp({
            varName: GET_ALL_VAR_NAMES.legalEntityId,
            callVarName: GET_ALL_VAR_NAMES.legalEntityId,
            type: 'number',
            decorator: new GmQueryParamNumDec('legal_entity_id'),
        })
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.list(methodPagination)
        }
        this.addMethod(methodCreate)
        this.addMethod(methodUpdate)
        this.addMethod(methodDelete)
        this.addMethod(methodGetById)
        this.addMethod(methodPagination)
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        })

        this.addElementBeforeClass(`
            type ${this.getValidatorCreateBodyTypeVarName()} = ${this.gmModuleCreateDto.getPropertyName()} & {
                legal_entity_id:number
            }
            type ${this.getValidatorUpdateBodyTypeVarName()} = ${this.gmModuleUpdateDto.getPropertyName()} & {
                legal_entity_id:number
            }
            
            const ${this.getValidatorVarName()} = new ${this.validator.getPropertyName()}()
            
            const ${this.getValidatorCreateBodyVarName()}:${this.gmServiceSchemaValidatorType.getSchemaValidatorType(this.getValidatorCreateBodyTypeVarName())} = ${this.validator.api.getCreateDtoSchema()}.merge(${this.gmServiceValidator.object({
            legal_entity_id: this.gmServiceValidator.number(),
        })})
             
            const ${this.getValidatorUpdateBodyVarName()}:${this.gmServiceSchemaValidatorType.getSchemaValidatorType(this.getValidatorUpdateBodyTypeVarName())} = ${this.validator.api.getUpdateDtoSchema()}.merge(${this.gmServiceValidator.object({
            legal_entity_id: this.gmServiceValidator.number(),
        })})
             
            const ${this.getValidatorParamsDtoVarName()} = ${this.validator.api.getDtoPaginationQueryParamsSchema()}
        `)
    }

    private getValidatorVarName() {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`
    }

    private getValidatorCreateBodyVarName(): string {
        return `create${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}BodySchema`
    }

    private getValidatorCreateBodyTypeVarName(): string {
        return `Create${this.getConfig().dtoName.singular}Body`
    }


    private getValidatorUpdateBodyVarName(): string {
        return `update${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}BodySchema`
    }

    private getValidatorUpdateBodyTypeVarName(): string {
        return `Update${this.getConfig().dtoName.singular}Body`
    }


    private getValidatorParamsDtoVarName(): string {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.singular)}DtoPaginationQueryParamsSchema`
    }

    private getServiceVarName(): string {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.singular)}Service`
    }
}


export class GmModuleControllerClassCreateBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {


    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassCreateBySqlDynamicLeId
    private readonly gmModuleCreateDto: GmModuleCreateDto
    private readonly gmServiceSchemaValidatorType: GmServiceSchemaValidatorType
    private readonly gmServiceValidator: GmServiceValidator
    private readonly gmAccessStructureMethodProcessorByDynamicLeId: GmAccessStructureMethodProcessor

    constructor(config: GmConfig,
    ) {
        super(
            config,
            `Create${StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`,
        )
        this.validator = new GmModuleValidator(
            config,
            this.getValidatorVarName(),
        )
        this.serviceCrud = new GmModuleServiceClassCreateBySqlDynamicLeId(
            config,
            `this.${this.getServiceVarName()}`,
            {
                initiatorOpenUserId: `${CREATE_VAR_NAMES.userInfo}.open_user_id`,
                createDto: CREATE_VAR_NAMES.body,
                legalEntityId: `${CREATE_VAR_NAMES.body}.legal_entity_id`,
            },
        )
        this.gmModuleCreateDto = new GmModuleCreateDto(config)
        this.gmServiceSchemaValidatorType = new GmServiceSchemaValidatorType()
        this.gmServiceValidator = new GmServiceValidator()
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config)

    }

    public init(): void {
        super.init()
        this.addModule(this.validator)
        this.addModule(this.serviceCrud)
        this.addModule(this.gmModuleCreateDto)
        this.addService(this.gmServiceSchemaValidatorType)
        this.addService(this.gmServiceValidator)

        const methodCreate = new GmModuleControllerMethodCreate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                createDto: CREATE_VAR_NAMES.body,
                userInfo: CREATE_VAR_NAMES.userInfo,
                createDtoSchema: this.getValidatorCreateBodyVarName(),
                createDtoType: this.getValidatorCreateBodyTypeVarName(),
            },
        )
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.add(methodCreate)
        }

        this.addMethod(methodCreate)

        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        })

        this.addElementBeforeClass(`
            const ${this.getValidatorVarName()} = new ${this.validator.getPropertyName()}()
        `)
        this.addElementBeforeClass(`
            type ${this.getValidatorCreateBodyTypeVarName()} = ${this.gmModuleCreateDto.getPropertyName()} & {
                legal_entity_id:number
            }
            const ${this.getValidatorCreateBodyVarName()}:${this.gmServiceSchemaValidatorType.getSchemaValidatorType(this.getValidatorCreateBodyTypeVarName())} = ${this.validator.api.getCreateDtoSchema()}.merge(${this.gmServiceValidator.object({
            legal_entity_id: this.gmServiceValidator.number(),
        })})
        `)
    }

    private getValidatorVarName() {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`
    }

    private getValidatorCreateBodyVarName(): string {
        return `create${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}BodySchema`
    }

    private getValidatorCreateBodyTypeVarName(): string {
        return `Create${this.getConfig().dtoName.singular}Body`
    }


    private getServiceVarName(): string {
        return `create${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`
    }
}


export class GmModuleControllerClassUpdateBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {


    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassUpdateBySqlDynamicLeId
    private readonly gmModuleUpdateDto: GmModuleUpdateDto
    private readonly gmServiceSchemaValidatorType: GmServiceSchemaValidatorType
    private readonly gmServiceValidator: GmServiceValidator
    private readonly gmAccessStructureMethodProcessorByDynamicLeId: GmAccessStructureMethodProcessor

    constructor(config: GmConfig,
    ) {
        super(
            config,
            `Update${StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`,
        )
        this.validator = new GmModuleValidator(
            config,
            this.getValidatorVarName(),
        )
        this.serviceCrud = new GmModuleServiceClassUpdateBySqlDynamicLeId(
            config,
            `this.${this.getServiceVarName()}`,
            {
                initiatorOpenUserId: `${UPDATE_VAR_NAMES.userInfo}.open_user_id`,
                updateDto: UPDATE_VAR_NAMES.body,
                legalEntityId: `${UPDATE_VAR_NAMES.body}.legal_entity_id`,
                id: UPDATE_VAR_NAMES.id,
            },
        )
        this.gmModuleUpdateDto = new GmModuleUpdateDto(config)
        this.gmServiceSchemaValidatorType = new GmServiceSchemaValidatorType()
        this.gmServiceValidator = new GmServiceValidator()
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config)

    }

    public init(): void {
        super.init()
        this.addModule(this.validator)
        this.addModule(this.serviceCrud)
        this.addModule(this.gmModuleUpdateDto)
        this.addService(this.gmServiceSchemaValidatorType)
        this.addService(this.gmServiceValidator)

        const methodUpdate = new GmModuleControllerMethodUpdate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                updateDto: UPDATE_VAR_NAMES.body,
                userInfo: UPDATE_VAR_NAMES.userInfo,
                updateDtoSchema: this.getValidatorUpdateBodyVarName(),
                updateDtoType: this.getValidatorUpdateBodyTypeVarName(),
                id: UPDATE_VAR_NAMES.id,
            },
        )
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'update')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.update(methodUpdate)
        }
        this.addMethod(methodUpdate)

        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        })

        this.addElementBeforeClass(`
            const ${this.getValidatorVarName()} = new ${this.validator.getPropertyName()}()
        `)
        this.addElementBeforeClass(`
            type ${this.getValidatorUpdateBodyTypeVarName()} = ${this.gmModuleUpdateDto.getPropertyName()} & {
                legal_entity_id:number
            }
            const ${this.getValidatorUpdateBodyVarName()}:${this.gmServiceSchemaValidatorType.getSchemaValidatorType(this.getValidatorUpdateBodyTypeVarName())} = ${this.validator.api.getUpdateDtoSchema()}.merge(${this.gmServiceValidator.object({
            legal_entity_id: this.gmServiceValidator.number(),
        })})
        `)
    }

    private getValidatorVarName() {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`
    }

    private getValidatorUpdateBodyVarName(): string {
        return `update${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}BodySchema`
    }

    private getValidatorUpdateBodyTypeVarName(): string {
        return `Update${this.getConfig().dtoName.singular}Body`
    }


    private getServiceVarName(): string {
        return `update${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`
    }
}

export class GmModuleControllerClassDeleteBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {

    private readonly serviceCrud: GmModuleServiceClassDeleteBySqlDynamicLeId
    private readonly gmAccessStructureMethodProcessorByDynamicLeId: GmAccessStructureMethodProcessor

    constructor(config: GmConfig,
    ) {
        super(
            config,
            `Delete${StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`,
        )
        this.serviceCrud = new GmModuleServiceClassDeleteBySqlDynamicLeId(
            config,
            `this.${this.getServiceVarName()}`,
            {
                initiatorOpenUserId: `${DELETE_VAR_NAMES.userInfo}.open_user_id`,
                legalEntityId: DELETE_VAR_NAMES.legalEntityId,
                id: DELETE_VAR_NAMES.id,
            },
        )
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config)

    }

    public init(): void {
        super.init()
        this.addModule(this.serviceCrud)

        const methodDelete = new GmModuleControllerMethodDelete(
            this.getConfig(),
            this.serviceCrud.api,
            {
                userInfo: DELETE_VAR_NAMES.userInfo,
                id: DELETE_VAR_NAMES.id,
            },
        ).addProp({
            varName: DELETE_VAR_NAMES.legalEntityId,
            callVarName: DELETE_VAR_NAMES.legalEntityId,
            type: 'number',
            decorator: new GmQueryParamNumDec('legal_entity_id'),
        })
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'delete')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.delete(methodDelete)
        }

        this.addMethod(methodDelete)

        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        })
    }


    private getServiceVarName(): string {
        return `delete${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`
    }
}


export class GmModuleControllerClassGetBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {

    private readonly serviceCrud: GmModuleServiceClassGetBySqlDynamicLeId
    private readonly gmAccessStructureMethodProcessorByDynamicLeId: GmAccessStructureMethodProcessor

    constructor(config: GmConfig,
    ) {
        super(
            config,
            `Get${StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`,
        )
        this.serviceCrud = new GmModuleServiceClassGetBySqlDynamicLeId(
            config,
            `this.${this.getServiceVarName()}`,
            {
                legalEntityId: GET_VAR_NAMES.legalEntityId,
                id: GET_VAR_NAMES.id,
            },
        )
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config)

    }

    public init(): void {
        super.init()
        this.addModule(this.serviceCrud)

        const methodGetById = new GmModuleControllerMethodGetById(
            this.getConfig(),
            this.serviceCrud.api,
            {
                userInfo: GET_VAR_NAMES.userInfo,
                id: GET_VAR_NAMES.id,
            },
        ).addProp({
            varName: GET_VAR_NAMES.legalEntityId,
            callVarName: GET_VAR_NAMES.legalEntityId,
            type: 'number',
            decorator: new GmQueryParamNumDec('legal_entity_id'),
        })

        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'get')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.get(methodGetById)
        }

        this.addMethod(methodGetById)

        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        })
    }


    private getServiceVarName(): string {
        return `get${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`
    }
}


export class GmModuleControllerClassGetAllBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {


    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassGetAllBySqlDynamicLeId
    private readonly gmAccessStructureMethodProcessorByDynamicLeId: GmAccessStructureMethodProcessorByDynamicLeId

    constructor(config: GmConfig,
    ) {
        super(
            config,
            `GetAll${StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`,
        )
        this.validator = new GmModuleValidator(
            config,
            this.getValidatorVarName(),
        )
        this.serviceCrud = new GmModuleServiceClassGetAllBySqlDynamicLeId(
            config,
            `this.${this.getServiceVarName()}`,
            {
                params: GET_ALL_VAR_NAMES.params,
                legalEntityId: GET_ALL_VAR_NAMES.legalEntityId,
            },
        )
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config)

    }

    public init(): void {
        super.init()
        this.addModule(this.validator)
        this.addModule(this.serviceCrud)

        const methodPagination = new GmModuleControllerMethodGetPagination(
            this.getConfig(),
            this.serviceCrud.api,
            {
                params: GET_ALL_VAR_NAMES.params,
                userInfo: GET_ALL_VAR_NAMES.userInfo,
                paramsSchema: this.getValidatorParamsDtoVarName(),
            },
        ).addProp({
            varName: GET_ALL_VAR_NAMES.legalEntityId,
            callVarName: GET_ALL_VAR_NAMES.legalEntityId,
            type: 'number',
            decorator: new GmQueryParamNumDec('legal_entity_id'),
        })
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.list(methodPagination)
        }
        this.addMethod(methodPagination)

        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        })

        this.addElementBeforeClass(`
            const ${this.getValidatorVarName()} = new ${this.validator.getPropertyName()}()
        `)
        this.addElementBeforeClass(`
            const ${this.getValidatorParamsDtoVarName()} = ${this.validator.api.getDtoPaginationQueryParamsSchema()}
        `)
    }

    private getValidatorVarName() {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`
    }

    private getValidatorParamsDtoVarName(): string {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.singular)}DtoPaginationQueryParamsSchema`
    }

    private getServiceVarName(): string {
        return `getAll${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`
    }
}