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
    GmModuleServiceClassCreateBySqlStaticDb,
    GmModuleServiceClassCrudBySqlStaticDb,
    GmModuleServiceClassDeleteBySqlStaticDb,
    GmModuleServiceClassGetAllBySqlStaticDb,
    GmModuleServiceClassGetBySqlStaticDb,
    GmModuleServiceClassUpdateBySqlStaticDb,
    GmModuleUpdateDto,
    GmModuleValidator,
    GmQueryParamNumDec,
    GmServiceSchemaValidatorType,
    GmServiceValidator,
    IGmModuleClass,
    IGmModuleClassMethod,
} from '@gm/core'
import {GmConfig} from '@gm'
import {StringCaseHelper} from '@helpers'


class GmGetVarNamesByStaticDb {
    constructor(private readonly config: GmConfig) {
    }

    public userInfo() {
        return 'userInfo'
    }

    public add() {
        const createBody = 'body'
        return {
            openUserId: `${this.userInfo()}.open_user_id`,
            createBody,
            createBodySchema: `create${StringCaseHelper.toPascalCase(this.config.dtoName.singular)}BodySchema`,
            legalEntityId: `${createBody}.legal_entity_id`,
            createBodyType: !GmConfigChecker.hasStructureAccess(this.config, 'add') ||
            GmConfigChecker.hasStructureAccess(this.config, 'add') && this.checkHasLeIdColumn()
                ? undefined : `Create${StringCaseHelper.toPascalCase(this.config.dtoName.singular)}Body`,
        }
    }

    public update() {
        const updateBody = 'body'
        return {
            updateBody,
            updateBodySchema: `update${StringCaseHelper.toPascalCase(this.config.dtoName.singular)}BodySchema`,
            id: 'id',
            openUserId: `${this.userInfo()}.open_user_id`,
            legalEntityId: `${updateBody}.legal_entity_id`,
            updateBodyType: GmConfigChecker.hasStructureAccess(this.config, 'update')  ? `Update${StringCaseHelper.toPascalCase(this.config.dtoName.singular)}Body` : undefined,
        }
    }

    public delete() {
        return {
            id: 'id',
            openUserId: `${this.userInfo()}.open_user_id`,
            legalEntityId: 'legalEntityId',

        }
    }

    public get() {
        return {
            id: 'id',
            openUserId: `${this.userInfo()}.open_user_id`,
            legalEntityId: 'legalEntityId',
        }
    }

    public list() {
        return {
            params: 'params',
            paramsSchema: `${StringCaseHelper.toCamelCase(this.config.dtoName.singular)}DtoPaginationQueryParamsSchema`,
            openUserId: `${this.userInfo()}.open_user_id`,
            legalEntityId: 'legalEntityId',
        }
    }

    public checkHasLeIdColumn(): boolean {
        return 'legal_entity_id' in this.config.model.columns &&
            (
                this.config.model.columns.legal_entity_id.type === 'INTEGER' ||
                this.config.model.columns.legal_entity_id.type === 'BIGINT'
            )
    }

}

class GmAccessStructureMethodProcessorByStaticDb extends GmAccessStructureMethodProcessor {

    constructor(config: GmConfig) {
        const gmGetVarNames = new GmGetVarNamesByStaticDb(config)
        super(config, {
            add: {
                openUserId: gmGetVarNames.add().openUserId,
                legalEntityId: gmGetVarNames.add().legalEntityId,
            },
            update: {
                openUserId: gmGetVarNames.update().openUserId,
                legalEntityId: gmGetVarNames.update().legalEntityId,
            },
            delete: {
                openUserId: gmGetVarNames.delete().openUserId,
                legalEntityId: gmGetVarNames.delete().legalEntityId,
            },
            get: {
                openUserId: gmGetVarNames.get().openUserId,
                legalEntityId: gmGetVarNames.get().legalEntityId,
            },
            list: {
                openUserId: gmGetVarNames.list().openUserId,
                legalEntityId: gmGetVarNames.list().legalEntityId,
            },
        })
    }

    public delete(method: IGmModuleClassMethod) {
        super.delete(method)
        method.appendPropDecorator({
            decorator: new GmQueryParamNumDec('legal_entity_id'),
            type: 'number',
            varName: 'legalEntityId',
        })

    }

    public get(method: IGmModuleClassMethod) {
        super.get(method)
        method.appendPropDecorator({
            decorator: new GmQueryParamNumDec('legal_entity_id'),
            type: 'number',
            varName: 'legalEntityId',
        })
    }

    public list(method: IGmModuleClassMethod) {
        super.list(method)
        method.appendPropDecorator({
            decorator: new GmQueryParamNumDec('legal_entity_id'),
            type: 'number',
            varName: 'legalEntityId',
        })

    }
}


class GmValidatorBuilderByStaticDb {

    private readonly gmGetVarNames: GmGetVarNamesByStaticDb
    private readonly gmServiceValidator: GmServiceValidator
    private readonly gmServiceSchemaValidatorType: GmServiceSchemaValidatorType

    constructor(
        private readonly config: GmConfig,
        private readonly validatorVarName: string,
        private readonly validator: GmModuleValidator,
    ) {
        this.gmGetVarNames = new GmGetVarNamesByStaticDb(config)
        this.gmServiceValidator = new GmServiceValidator()
        this.gmServiceSchemaValidatorType = new GmServiceSchemaValidatorType()
    }


    public initValidator(): string {
        return `const ${this.validatorVarName} = new ${this.validator.getPropertyName()}()`
    }

    public add() {
        const schemaTypeStr = this.gmGetVarNames.add().createBodyType ? ` :${this.gmServiceSchemaValidatorType.getSchemaValidatorType(this.gmGetVarNames.add().createBodyType || '')}` : ''
        if (!GmConfigChecker.hasStructureAccess(this.config, 'add')) {
            return `const ${this.gmGetVarNames.add().createBodySchema}${schemaTypeStr} = ${this.validator.api.getCreateDtoSchema()}`
        }
        if (this.gmGetVarNames.checkHasLeIdColumn()) {
            return `const ${this.gmGetVarNames.add().createBodySchema}${schemaTypeStr} = ${this.validator.api.getCreateDtoSchema()}`
        }
        return `const ${this.gmGetVarNames.add().createBodySchema}${schemaTypeStr} = ${this.validator.api.getCreateDtoSchema()}.merge(${this.gmServiceValidator.object({
            legal_entity_id: this.gmServiceValidator.number(),
        })})`
    }

    public update() {
        const schemaTypeStr = this.gmGetVarNames.update().updateBodyType ? ` :${this.gmServiceSchemaValidatorType.getSchemaValidatorType(this.gmGetVarNames.update().updateBodyType || '')}` : ''
        if (!GmConfigChecker.hasStructureAccess(this.config, 'update')) {
            return `const ${this.gmGetVarNames.update().updateBodySchema}${schemaTypeStr} = ${this.validator.api.getUpdateDtoSchema()}`
        }
        return `const ${this.gmGetVarNames.update().updateBodySchema}${schemaTypeStr} = ${this.validator.api.getUpdateDtoSchema()}.merge(${this.gmServiceValidator.object({
            legal_entity_id: this.gmServiceValidator.number(),
        })})`
    }

    public list() {
        return `const ${this.gmGetVarNames.list().paramsSchema} = ${this.validator.api.getDtoPaginationQueryParamsSchema()}`
    }

    public checkHasAddValidatorService(type: 'add' | 'update') {
        if(type === 'update'){
            return GmConfigChecker.hasStructureAccess(this.config, type)
        }

        return GmConfigChecker.hasStructureAccess(this.config, type) && !this.gmGetVarNames.checkHasLeIdColumn()
    }


}

export class GmModuleControllerClassCrudBySqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {


    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassCrudBySqlStaticDb
    private readonly gmGetVarNames: GmGetVarNamesByStaticDb
    private readonly gmAccessStructureMethodProcessorByStaticDb: GmAccessStructureMethodProcessorByStaticDb
    private readonly gmValidatorBuilder: GmValidatorBuilderByStaticDb
    private readonly gmModuleCreateDto: GmModuleCreateDto
    private readonly gmModuleUpdateDto: GmModuleUpdateDto

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
        this.gmValidatorBuilder = new GmValidatorBuilderByStaticDb(
            config,
            this.getValidatorVarName(),
            this.validator,
        )

        const gmGetVarNames = new GmGetVarNamesByStaticDb(config)

        this.serviceCrud = new GmModuleServiceClassCrudBySqlStaticDb(
            config,
            `this.${this.getServiceVarName()}`,
            {
                create: {
                    createDto: gmGetVarNames.add().createBody,
                    initiatorOpenUserId: gmGetVarNames.add().openUserId,
                },
                update: {
                    id: gmGetVarNames.update().id,
                    updateDto: gmGetVarNames.update().updateBody,
                    initiatorOpenUserId: gmGetVarNames.update().openUserId,
                },
                delete: {
                    id: gmGetVarNames.delete().id,
                    initiatorOpenUserId: gmGetVarNames.delete().openUserId,
                },
                getById: {
                    id: gmGetVarNames.get().id,
                },
                getPagination: {
                    params: gmGetVarNames.list().params,
                },
            },
        )
        this.gmAccessStructureMethodProcessorByStaticDb = new GmAccessStructureMethodProcessorByStaticDb(config)
        this.gmGetVarNames = gmGetVarNames
        this.gmModuleCreateDto = new GmModuleCreateDto(config)
        this.gmModuleUpdateDto = new GmModuleUpdateDto(config)

    }

    public init(): void {
        super.init()
        this.addModule(this.validator)
        this.addModule(this.serviceCrud)
        if (
            this.gmValidatorBuilder.checkHasAddValidatorService('add') ||
            this.gmValidatorBuilder.checkHasAddValidatorService('update')
        ) {
            this.addService(new GmServiceValidator())
            this.addService(new GmServiceSchemaValidatorType())
        }

        if (
            this.gmValidatorBuilder.checkHasAddValidatorService('add')
        ) {
            this.addModule(this.gmModuleCreateDto)
        }

        if (
            this.gmValidatorBuilder.checkHasAddValidatorService('update')
        ) {
            this.addModule(this.gmModuleUpdateDto)
        }

        const methodCreate = new GmModuleControllerMethodCreate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                createDto: this.gmGetVarNames.add().createBody,
                createDtoType: this.gmGetVarNames.add().createBodyType,
                userInfo: this.gmGetVarNames.userInfo(),
                createDtoSchema: this.gmGetVarNames.add().createBodySchema,
            },
        )
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByStaticDb.add(methodCreate)
        }
        const methodUpdate = new GmModuleControllerMethodUpdate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                updateDto: this.gmGetVarNames.update().updateBody,
                updateDtoType: this.gmGetVarNames.update().updateBodyType,
                userInfo: this.gmGetVarNames.userInfo(),
                updateDtoSchema: this.gmGetVarNames.update().updateBodySchema,
                id: this.gmGetVarNames.update().id,
            },
        )
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'update')) {
            this.gmAccessStructureMethodProcessorByStaticDb.update(methodUpdate)
        }
        const methodDelete = new GmModuleControllerMethodDelete(
            this.getConfig(),
            this.serviceCrud.api,
            {
                userInfo: this.gmGetVarNames.userInfo(),
                id: this.gmGetVarNames.delete().id,
            },
        )
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'delete')) {
            this.gmAccessStructureMethodProcessorByStaticDb.delete(methodDelete)
        }
        const methodGetById = new GmModuleControllerMethodGetById(
            this.getConfig(),
            this.serviceCrud.api,
            {
                userInfo: this.gmGetVarNames.userInfo(),
                id: this.gmGetVarNames.get().id,
            },
        )
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'get')) {
            this.gmAccessStructureMethodProcessorByStaticDb.get(methodGetById)
        }
        const methodPagination = new GmModuleControllerMethodGetPagination(
            this.getConfig(),
            this.serviceCrud.api,
            {
                params: this.gmGetVarNames.list().params,
                userInfo: this.gmGetVarNames.userInfo(),
                paramsSchema: this.gmGetVarNames.list().paramsSchema,
            },
        )
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByStaticDb.list(methodPagination)
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

        if (this.gmGetVarNames.add().createBodyType) {
            this.addElementBeforeClass(`
                type ${this.gmGetVarNames.add().createBodyType} = ${this.gmModuleCreateDto.getPropertyName()} & {legal_entity_id:number}
            `)
        }
        if (this.gmGetVarNames.update().updateBodyType) {
            this.addElementBeforeClass(`
                type ${this.gmGetVarNames.update().updateBodyType} = ${this.gmModuleUpdateDto.getPropertyName()} & {legal_entity_id:number}
            `)
        }

        this.addElementBeforeClass(`
            ${this.gmValidatorBuilder.initValidator()}
            
            ${this.gmValidatorBuilder.add()}
            
            ${this.gmValidatorBuilder.update()}
            
            ${this.gmValidatorBuilder.list()}
        `)
    }

    private getValidatorVarName() {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`
    }

    private getServiceVarName(): string {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.singular)}Service`
    }
}


export class GmModuleControllerClassCreateBySqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {


    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassCreateBySqlStaticDb
    private readonly gmGetVarNames: GmGetVarNamesByStaticDb
    private readonly gmAccessStructureMethodProcessorByStaticDb: GmAccessStructureMethodProcessorByStaticDb
    private readonly gmValidatorBuilder: GmValidatorBuilderByStaticDb
    private readonly gmModuleCreateDto: GmModuleCreateDto

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
        this.gmValidatorBuilder = new GmValidatorBuilderByStaticDb(
            config,
            this.getValidatorVarName(),
            this.validator,
        )
        const gmGetVarNames = new GmGetVarNamesByStaticDb(config)

        this.serviceCrud = new GmModuleServiceClassCreateBySqlStaticDb(
            config,
            `this.${this.getServiceVarName()}`,
            {
                createDto: gmGetVarNames.add().createBody,
                initiatorOpenUserId: gmGetVarNames.add().openUserId,
            },
        )
        this.gmAccessStructureMethodProcessorByStaticDb = new GmAccessStructureMethodProcessorByStaticDb(config)
        this.gmGetVarNames = gmGetVarNames
        this.gmModuleCreateDto = new GmModuleCreateDto(config)

    }

    public init(): void {
        super.init()
        this.addModule(this.validator)
        this.addModule(this.serviceCrud)
        if (
            this.gmValidatorBuilder.checkHasAddValidatorService('add')
        ) {
            this.addService(new GmServiceValidator())
            this.addService(new GmServiceSchemaValidatorType())
            this.addModule(this.gmModuleCreateDto)
        }

        const methodCreate = new GmModuleControllerMethodCreate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                createDto: this.gmGetVarNames.add().createBody,
                createDtoType: this.gmGetVarNames.add().createBodyType,
                userInfo: this.gmGetVarNames.userInfo(),
                createDtoSchema: this.gmGetVarNames.add().createBodySchema,
            },
        )
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByStaticDb.add(methodCreate)
        }
        this.addMethod(methodCreate)

        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        })

        if (this.gmGetVarNames.add().createBodyType) {
            this.addElementBeforeClass(`
                type ${this.gmGetVarNames.add().createBodyType} = ${this.gmModuleCreateDto.getPropertyName()} & {legal_entity_id:number}
            `)
        }
        this.addElementBeforeClass(`
            ${this.gmValidatorBuilder.initValidator()}
            
            ${this.gmValidatorBuilder.add()}
        `)
    }

    private getValidatorVarName() {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`
    }

    private getServiceVarName(): string {
        return `create${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`
    }
}


export class GmModuleControllerClassUpdateBySqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {


    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassUpdateBySqlStaticDb
    private readonly gmGetVarNames: GmGetVarNamesByStaticDb
    private readonly gmAccessStructureMethodProcessorByStaticDb: GmAccessStructureMethodProcessorByStaticDb
    private readonly gmValidatorBuilder: GmValidatorBuilderByStaticDb
    private readonly gmModuleUpdateDto: GmModuleUpdateDto

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
        this.gmValidatorBuilder = new GmValidatorBuilderByStaticDb(
            config,
            this.getValidatorVarName(),
            this.validator,
        )
        const gmGetVarNames = new GmGetVarNamesByStaticDb(config)

        this.serviceCrud = new GmModuleServiceClassUpdateBySqlStaticDb(
            config,
            `this.${this.getServiceVarName()}`,
            {
                id: gmGetVarNames.update().id,
                updateDto: gmGetVarNames.update().updateBody,
                initiatorOpenUserId: gmGetVarNames.update().openUserId,
            },
        )
        this.gmAccessStructureMethodProcessorByStaticDb = new GmAccessStructureMethodProcessorByStaticDb(config)
        this.gmGetVarNames = gmGetVarNames
        this.gmModuleUpdateDto = new GmModuleUpdateDto(config)

    }

    public init(): void {
        super.init()
        this.addModule(this.validator)
        this.addModule(this.serviceCrud)
        if (
            this.gmValidatorBuilder.checkHasAddValidatorService('update')
        ) {
            this.addService(new GmServiceValidator())
            this.addService(new GmServiceSchemaValidatorType())
        }
        const methodUpdate = new GmModuleControllerMethodUpdate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                updateDto: this.gmGetVarNames.update().updateBody,
                updateDtoType: this.gmGetVarNames.update().updateBodyType,
                userInfo: this.gmGetVarNames.userInfo(),
                updateDtoSchema: this.gmGetVarNames.update().updateBodySchema,
                id: this.gmGetVarNames.update().id,
            },
        )
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'update')) {
            this.gmAccessStructureMethodProcessorByStaticDb.update(methodUpdate)
            this.addModule(this.gmModuleUpdateDto)
        }
        this.addMethod(methodUpdate)

        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        })

        if (this.gmGetVarNames.update().updateBodyType) {
            this.addElementBeforeClass(`
                type ${this.gmGetVarNames.update().updateBodyType} = ${this.gmModuleUpdateDto.getPropertyName()} & {legal_entity_id:number}
            `)
        }

        this.addElementBeforeClass(`
            ${this.gmValidatorBuilder.initValidator()}
            
            ${this.gmValidatorBuilder.update()}
        `)
    }

    private getValidatorVarName() {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`
    }

    private getServiceVarName(): string {
        return `update${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`
    }
}

export class GmModuleControllerClassDeleteBySqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {

    private readonly serviceCrud: GmModuleServiceClassDeleteBySqlStaticDb
    private readonly gmGetVarNames: GmGetVarNamesByStaticDb
    private readonly gmAccessStructureMethodProcessorByStaticDb: GmAccessStructureMethodProcessorByStaticDb

    constructor(config: GmConfig,
    ) {
        super(
            config,
            `Delete${StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`,
        )
        const gmGetVarNames = new GmGetVarNamesByStaticDb(config)
        this.serviceCrud = new GmModuleServiceClassDeleteBySqlStaticDb(
            config,
            `this.${this.getServiceVarName()}`,
            {
                id: gmGetVarNames.delete().id,
                initiatorOpenUserId: gmGetVarNames.delete().openUserId,
            },
        )
        this.gmAccessStructureMethodProcessorByStaticDb = new GmAccessStructureMethodProcessorByStaticDb(config)
        this.gmGetVarNames = gmGetVarNames
    }

    public init(): void {
        super.init()
        this.addModule(this.serviceCrud)

        const methodDelete = new GmModuleControllerMethodDelete(
            this.getConfig(),
            this.serviceCrud.api,
            {
                userInfo: this.gmGetVarNames.userInfo(),
                id: this.gmGetVarNames.delete().id,
            },
        )
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'delete')) {
            this.gmAccessStructureMethodProcessorByStaticDb.delete(methodDelete)
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


export class GmModuleControllerClassGetBySqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {

    private readonly serviceCrud: GmModuleServiceClassGetBySqlStaticDb
    private readonly gmGetVarNames: GmGetVarNamesByStaticDb
    private readonly gmAccessStructureMethodProcessorByStaticDb: GmAccessStructureMethodProcessorByStaticDb


    constructor(config: GmConfig,
    ) {
        super(
            config,
            `Get${StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`,
        )
        const gmGetVarNames = new GmGetVarNamesByStaticDb(config)
        this.serviceCrud = new GmModuleServiceClassGetBySqlStaticDb(
            config,
            `this.${this.getServiceVarName()}`,
            {
                id: gmGetVarNames.get().id,
            },
        )
        this.gmAccessStructureMethodProcessorByStaticDb = new GmAccessStructureMethodProcessorByStaticDb(config)
        this.gmGetVarNames = gmGetVarNames
    }

    public init(): void {
        super.init()
        this.addModule(this.serviceCrud)

        const methodGetById = new GmModuleControllerMethodGetById(
            this.getConfig(),
            this.serviceCrud.api,
            {
                userInfo: this.gmGetVarNames.userInfo(),
                id: this.gmGetVarNames.get().id,
            },
        )
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'get')) {
            this.gmAccessStructureMethodProcessorByStaticDb.get(methodGetById)
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


export class GmModuleControllerClassGetAllBySqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {


    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassGetAllBySqlStaticDb
    private readonly gmGetVarNames: GmGetVarNamesByStaticDb
    private readonly gmAccessStructureMethodProcessorByStaticDb: GmAccessStructureMethodProcessorByStaticDb
    private readonly gmValidatorBuilder: GmValidatorBuilderByStaticDb

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

        this.gmValidatorBuilder = new GmValidatorBuilderByStaticDb(
            config,
            this.getValidatorVarName(),
            this.validator,
        )

        const gmGetVarNames = new GmGetVarNamesByStaticDb(config)

        this.serviceCrud = new GmModuleServiceClassGetAllBySqlStaticDb(
            config,
            `this.${this.getServiceVarName()}`,
            {
                params: gmGetVarNames.list().params,
            },
        )
        this.gmAccessStructureMethodProcessorByStaticDb = new GmAccessStructureMethodProcessorByStaticDb(config)
        this.gmGetVarNames = gmGetVarNames
    }

    public init(): void {
        super.init()
        this.addModule(this.validator)
        this.addModule(this.serviceCrud)

        const methodPagination = new GmModuleControllerMethodGetPagination(
            this.getConfig(),
            this.serviceCrud.api,
            {
                params: this.gmGetVarNames.list().params,
                userInfo: this.gmGetVarNames.userInfo(),
                paramsSchema: this.gmGetVarNames.list().paramsSchema,
            },
        )
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByStaticDb.list(methodPagination)
        }
        this.addMethod(methodPagination)

        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        })

        this.addElementBeforeClass(`
            ${this.gmValidatorBuilder.initValidator()}
            ${this.gmValidatorBuilder.list()}
        `)
    }

    private getValidatorVarName() {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`
    }

    private getServiceVarName(): string {
        return `getAll${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`
    }
}