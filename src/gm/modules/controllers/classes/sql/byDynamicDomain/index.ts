import {
    GmAccessStructureMethodProcessor, GmConfigChecker,
    GmDomainDec,
    GmModuleAbstractControllerClass,
    GmModuleControllerMethodCreate,
    GmModuleControllerMethodDelete,
    GmModuleControllerMethodGetById,
    GmModuleControllerMethodGetPagination,
    GmModuleControllerMethodUpdate,
    GmModuleServiceClassCreateBySqlDynamicDomain,
    GmModuleServiceClassCrudBySqlDynamicDomain,
    GmModuleServiceClassDeleteBySqlDynamicDomain,
    GmModuleServiceClassGetAllBySqlDynamicDomain,
    GmModuleServiceClassGetBySqlDynamicDomain,
    GmModuleServiceClassUpdateBySqlDynamicDomain,
    GmModuleValidator,
    IGmModuleClass,
    IGmModuleClassMethod,
} from '@gm/core'
import {GmConfig} from '@gm'
import {StringCaseHelper} from '@helpers'


const CREATE_VAR_NAMES = {
    domain: 'domain',
    createDto: 'createDto',
    createDtoSchema: 'createDtoSchema',
    userInfo: 'userInfo',
} as const

const UPDATE_VAR_NAMES = {
    domain: 'domain',
    updateDto: 'updateDto',
    updateDtoSchema: 'createDtoSchema',
    userInfo: 'userInfo',
    id: 'id',
} as const

const DELETE_VAR_NAMES = {
    domain: 'domain',
    userInfo: 'userInfo',
    id: 'id',
} as const

const GET_VAR_NAMES = {
    domain: 'domain',
    userInfo: 'userInfo',
    id: 'id',
} as const

const GET_ALL_VAR_NAMES = {
    domain: 'domain',
    params: 'params',
    userInfo: 'userInfo',
} as const


class GmAccessStructureMethodProcessorByDynamicDomain extends GmAccessStructureMethodProcessor {
    constructor(config: GmConfig) {
        super(config, {
            add: {
                openUserId: `${CREATE_VAR_NAMES.userInfo}.open_user_id`,
                legalEntityId: 'legalEntityId',
            },
            update: {
                openUserId: `${UPDATE_VAR_NAMES.userInfo}.open_user_id`,
                legalEntityId: 'legalEntityId',
            },
            delete: {
                openUserId: `${DELETE_VAR_NAMES.userInfo}.open_user_id`,
                legalEntityId: 'legalEntityId',
            },
            get: {
                openUserId: `${GET_VAR_NAMES.userInfo}.open_user_id`,
                legalEntityId: 'legalEntityId',
            },
            list: {
                openUserId: `${GET_ALL_VAR_NAMES.userInfo}.open_user_id`,
                legalEntityId: 'legalEntityId',
            },
        })
    }

    public add(method: IGmModuleClassMethod) {
        super.add(method)
        method.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'OsCoreLegalEntityService',
        })
        method.prependBodyElement({
            name: 'get le id',
            value: `const legalEntityId = await OsCoreLegalEntityService.getIdByDomain(${CREATE_VAR_NAMES.domain})`,
        })

    }

    public update(method: IGmModuleClassMethod) {
        super.update(method)
        method.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'OsCoreLegalEntityService',
        })
        method.prependBodyElement({
            name: 'get le id',
            value: `const legalEntityId = await OsCoreLegalEntityService.getIdByDomain(${UPDATE_VAR_NAMES.domain})`,
        })
    }

    public delete(method: IGmModuleClassMethod) {
        super.delete(method)
        method.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'OsCoreLegalEntityService',
        })
        method.prependBodyElement({
            name: 'get le id',
            value: `const legalEntityId = await OsCoreLegalEntityService.getIdByDomain(${DELETE_VAR_NAMES.domain})`,
        })

    }

    public get(method: IGmModuleClassMethod) {
        super.get(method)
        method.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'OsCoreLegalEntityService',
        })
        method.prependBodyElement({
            name: 'get le id',
            value: `const legalEntityId = await OsCoreLegalEntityService.getIdByDomain(${GET_VAR_NAMES.domain})`,
        })
    }

    public list(method: IGmModuleClassMethod) {
        super.list(method)
        method.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'OsCoreLegalEntityService',
        })
        method.prependBodyElement({
            name: 'get le id',
            value: `const legalEntityId = await OsCoreLegalEntityService.getIdByDomain(${GET_ALL_VAR_NAMES.domain})`,
        })

    }
}

export class GmModuleControllerClassCrudBySqlDynamicDomain extends GmModuleAbstractControllerClass implements IGmModuleClass {


    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassCrudBySqlDynamicDomain
    private readonly gmAccessStructureMethodProcessorByDynamicDomain: GmAccessStructureMethodProcessorByDynamicDomain

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
        this.serviceCrud = new GmModuleServiceClassCrudBySqlDynamicDomain(
            config,
            `this.${this.getServiceVarName()}`,
            {
                create: {
                    domain: CREATE_VAR_NAMES.domain,
                    createDto: CREATE_VAR_NAMES.createDto,
                    initiatorOpenUserId: `${CREATE_VAR_NAMES.userInfo}.open_user_id`,
                },
                update: {
                    domain: UPDATE_VAR_NAMES.domain,
                    id: UPDATE_VAR_NAMES.id,
                    updateDto: UPDATE_VAR_NAMES.updateDto,
                    initiatorOpenUserId: `${UPDATE_VAR_NAMES.userInfo}.open_user_id`,
                },
                delete: {
                    domain: DELETE_VAR_NAMES.domain,
                    id: DELETE_VAR_NAMES.id,
                    initiatorOpenUserId: `${DELETE_VAR_NAMES.userInfo}.open_user_id`,
                },
                getById: {
                    domain: GET_VAR_NAMES.domain,
                    id: GET_VAR_NAMES.id,
                },
                getPagination: {
                    domain: GET_ALL_VAR_NAMES.domain,
                    params: GET_ALL_VAR_NAMES.params,
                },
            },
        )
        this.gmAccessStructureMethodProcessorByDynamicDomain = new GmAccessStructureMethodProcessorByDynamicDomain(config)

    }

    public init(): void {
        super.init()
        this.addModule(this.validator)
        this.addModule(this.serviceCrud)

        const methodCreate = new GmModuleControllerMethodCreate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                createDto: CREATE_VAR_NAMES.createDto,
                userInfo: CREATE_VAR_NAMES.userInfo,
                createDtoSchema: this.getValidatorCreateDtoVarName(),
            },
        ).addProp({
            varName: CREATE_VAR_NAMES.domain,
            callVarName: CREATE_VAR_NAMES.domain,
            type: 'string',
            decorator: new GmDomainDec(),
        })
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByDynamicDomain.add(methodCreate)
        }
        const methodUpdate = new GmModuleControllerMethodUpdate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                updateDto: UPDATE_VAR_NAMES.updateDto,
                userInfo: UPDATE_VAR_NAMES.userInfo,
                updateDtoSchema: this.getValidatorUpdateDtoVarName(),
                id: UPDATE_VAR_NAMES.id,
            },
        ).addProp({
            varName: UPDATE_VAR_NAMES.domain,
            callVarName: UPDATE_VAR_NAMES.domain,
            type: 'string',
            decorator: new GmDomainDec(),
        })
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'update')) {
            this.gmAccessStructureMethodProcessorByDynamicDomain.update(methodUpdate)
        }
        const methodDelete = new GmModuleControllerMethodDelete(
            this.getConfig(),
            this.serviceCrud.api,
            {
                userInfo: DELETE_VAR_NAMES.userInfo,
                id: DELETE_VAR_NAMES.id,
            },
        ).addProp({
            varName: DELETE_VAR_NAMES.domain,
            callVarName: DELETE_VAR_NAMES.domain,
            type: 'string',
            decorator: new GmDomainDec(),
        })
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'delete')) {
            this.gmAccessStructureMethodProcessorByDynamicDomain.delete(methodDelete)
        }
        const methodGetById = new GmModuleControllerMethodGetById(
            this.getConfig(),
            this.serviceCrud.api,
            {
                userInfo: GET_VAR_NAMES.userInfo,
                id: GET_VAR_NAMES.id,
            },
        ).addProp({
            varName: GET_VAR_NAMES.domain,
            callVarName: GET_VAR_NAMES.domain,
            type: 'string',
            decorator: new GmDomainDec(),
        })
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'get')) {
            this.gmAccessStructureMethodProcessorByDynamicDomain.get(methodGetById)
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
            varName: GET_ALL_VAR_NAMES.domain,
            callVarName: GET_ALL_VAR_NAMES.domain,
            type: 'string',
            decorator: new GmDomainDec(),
        })
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByDynamicDomain.list(methodPagination)
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
            const ${this.getValidatorVarName()} = new ${this.validator.getPropertyName()}()
            const ${this.getValidatorCreateDtoVarName()} = ${this.validator.api.getCreateDtoSchema()}
            const ${this.getValidatorUpdateDtoVarName()} = ${this.validator.api.getUpdateDtoSchema()}
            const ${this.getValidatorParamsDtoVarName()} = ${this.validator.api.getDtoPaginationQueryParamsSchema()}
        `)
    }

    private getValidatorVarName() {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`
    }

    private getValidatorCreateDtoVarName(): string {
        return `create${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}DtoSchema`
    }

    private getValidatorUpdateDtoVarName(): string {
        return `update${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}DtoSchema`
    }

    private getValidatorParamsDtoVarName(): string {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.singular)}DtoPaginationQueryParamsSchema`
    }

    private getServiceVarName(): string {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.singular)}Service`
    }
}


export class GmModuleControllerClassCreateBySqlDynamicDomain extends GmModuleAbstractControllerClass implements IGmModuleClass {


    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassCreateBySqlDynamicDomain
    private readonly gmAccessStructureMethodProcessorByDynamicDomain: GmAccessStructureMethodProcessorByDynamicDomain

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
        this.serviceCrud = new GmModuleServiceClassCreateBySqlDynamicDomain(
            config,
            `this.${this.getServiceVarName()}`,
            {
                initiatorOpenUserId: `${CREATE_VAR_NAMES.userInfo}.open_user_id`,
                createDto: CREATE_VAR_NAMES.createDto,
                domain: CREATE_VAR_NAMES.domain,
            },
        )
        this.gmAccessStructureMethodProcessorByDynamicDomain = new GmAccessStructureMethodProcessorByDynamicDomain(config)

    }

    public init(): void {
        super.init()
        this.addModule(this.validator)
        this.addModule(this.serviceCrud)

        const methodCreate = new GmModuleControllerMethodCreate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                createDto: CREATE_VAR_NAMES.createDto,
                userInfo: CREATE_VAR_NAMES.userInfo,
                createDtoSchema: this.getValidatorCreateDtoVarName(),
            },
        ).addProp({
            varName: CREATE_VAR_NAMES.domain,
            callVarName: CREATE_VAR_NAMES.domain,
            type: 'string',
            decorator: new GmDomainDec(),
        })
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByDynamicDomain.add(methodCreate)
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
            const ${this.getValidatorCreateDtoVarName()} = ${this.validator.api.getCreateDtoSchema()}
        `)
    }

    private getValidatorVarName() {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`
    }

    private getValidatorCreateDtoVarName(): string {
        return `create${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}DtoSchema`
    }

    private getServiceVarName(): string {
        return `create${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`
    }
}


export class GmModuleControllerClassUpdateBySqlDynamicDomain extends GmModuleAbstractControllerClass implements IGmModuleClass {


    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassUpdateBySqlDynamicDomain
    private readonly gmAccessStructureMethodProcessorByDynamicDomain: GmAccessStructureMethodProcessorByDynamicDomain

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
        this.serviceCrud = new GmModuleServiceClassUpdateBySqlDynamicDomain(
            config,
            `this.${this.getServiceVarName()}`,
            {
                initiatorOpenUserId: `${UPDATE_VAR_NAMES.userInfo}.open_user_id`,
                updateDto: UPDATE_VAR_NAMES.updateDto,
                domain: UPDATE_VAR_NAMES.domain,
                id: UPDATE_VAR_NAMES.id,
            },
        )
        this.gmAccessStructureMethodProcessorByDynamicDomain = new GmAccessStructureMethodProcessorByDynamicDomain(config)


    }

    public init(): void {
        super.init()
        this.addModule(this.validator)
        this.addModule(this.serviceCrud)

        const methodUpdate = new GmModuleControllerMethodUpdate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                updateDto: UPDATE_VAR_NAMES.updateDto,
                userInfo: UPDATE_VAR_NAMES.userInfo,
                updateDtoSchema: this.getValidatorUpdateDtoVarName(),
                id: UPDATE_VAR_NAMES.id,
            },
        ).addProp({
            varName: UPDATE_VAR_NAMES.domain,
            callVarName: UPDATE_VAR_NAMES.domain,
            type: 'string',
            decorator: new GmDomainDec(),
        })
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'update')) {
            this.gmAccessStructureMethodProcessorByDynamicDomain.update(methodUpdate)
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
            const ${this.getValidatorUpdateDtoVarName()} = ${this.validator.api.getUpdateDtoSchema()}
        `)
    }

    private getValidatorVarName() {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`
    }

    private getValidatorUpdateDtoVarName(): string {
        return `update${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}DtoSchema`
    }

    private getServiceVarName(): string {
        return `update${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`
    }
}

export class GmModuleControllerClassDeleteBySqlDynamicDomain extends GmModuleAbstractControllerClass implements IGmModuleClass {

    private readonly serviceCrud: GmModuleServiceClassDeleteBySqlDynamicDomain
    private readonly gmAccessStructureMethodProcessorByDynamicDomain: GmAccessStructureMethodProcessorByDynamicDomain

    constructor(config: GmConfig,
    ) {
        super(
            config,
            `Delete${StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`,
        )
        this.serviceCrud = new GmModuleServiceClassDeleteBySqlDynamicDomain(
            config,
            `this.${this.getServiceVarName()}`,
            {
                initiatorOpenUserId: `${DELETE_VAR_NAMES.userInfo}.open_user_id`,
                domain: DELETE_VAR_NAMES.domain,
                id: DELETE_VAR_NAMES.id,
            },
        )
        this.gmAccessStructureMethodProcessorByDynamicDomain = new GmAccessStructureMethodProcessorByDynamicDomain(config)


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
            varName: DELETE_VAR_NAMES.domain,
            callVarName: DELETE_VAR_NAMES.domain,
            type: 'string',
            decorator: new GmDomainDec(),
        })
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'delete')) {
            this.gmAccessStructureMethodProcessorByDynamicDomain.delete(methodDelete)
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


export class GmModuleControllerClassGetBySqlDynamicDomain extends GmModuleAbstractControllerClass implements IGmModuleClass {

    private readonly serviceCrud: GmModuleServiceClassGetBySqlDynamicDomain
    private readonly gmAccessStructureMethodProcessorByDynamicDomain: GmAccessStructureMethodProcessorByDynamicDomain

    constructor(config: GmConfig,
    ) {
        super(
            config,
            `Get${StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`,
        )
        this.serviceCrud = new GmModuleServiceClassGetBySqlDynamicDomain(
            config,
            `this.${this.getServiceVarName()}`,
            {
                domain: GET_VAR_NAMES.domain,
                id: GET_VAR_NAMES.id,
            },
        )
        this.gmAccessStructureMethodProcessorByDynamicDomain = new GmAccessStructureMethodProcessorByDynamicDomain(config)


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
            varName: GET_VAR_NAMES.domain,
            callVarName: GET_VAR_NAMES.domain,
            type: 'string',
            decorator: new GmDomainDec(),
        })
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'get')) {
            this.gmAccessStructureMethodProcessorByDynamicDomain.get(methodGetById)
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


export class GmModuleControllerClassGetAllBySqlDynamicDomain extends GmModuleAbstractControllerClass implements IGmModuleClass {


    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassGetAllBySqlDynamicDomain
    private readonly gmAccessStructureMethodProcessorByDynamicDomain: GmAccessStructureMethodProcessorByDynamicDomain

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
        this.serviceCrud = new GmModuleServiceClassGetAllBySqlDynamicDomain(
            config,
            `this.${this.getServiceVarName()}`,
            {
                params: GET_ALL_VAR_NAMES.params,
                domain: GET_ALL_VAR_NAMES.domain,
            },
        )
        this.gmAccessStructureMethodProcessorByDynamicDomain = new GmAccessStructureMethodProcessorByDynamicDomain(config)


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
            varName: GET_ALL_VAR_NAMES.domain,
            callVarName: GET_ALL_VAR_NAMES.domain,
            type: 'string',
            decorator: new GmDomainDec(),
        })
        if (GmConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByDynamicDomain.list(methodPagination)
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