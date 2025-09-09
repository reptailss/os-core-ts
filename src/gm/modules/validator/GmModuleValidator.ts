import {
    GmAbstractModuleClass,
    GmAbstractModuleClassMethod,
    GmModuleCreateDto,
    GmModuleDto,
    GmModuleDtoHelper,
    GmModuleUpdateDto,
    GmServiceObjectSchemaValidatorType,
    GmServicePaginationQueryParamsType,
    GmServicePaginationQueryParamsValidator,
    GmServiceSchemaValidatorType,
    GmServiceValidator,
    IGmModuleClass,
    IGmModuleClassMethod,
} from '@gm/core'
import {StringCaseHelper} from '@helpers'
import {GmConfig} from '@gm'

export class GmModuleValidator extends GmAbstractModuleClass implements IGmModuleClass {


    constructor(
        config: GmConfig,
        private readonly schemaVarName: string,
    ) {
        super(config)
    }

    public getPropertyName(): string {
        return `${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Validator`
    }

    public getDirName(): string | null {
        return 'validator'
    }

    public getFileName(): string {
        return `${this.getPropertyName()}.ts`
    }

    public init(): void {
        this
            .addMethod(new GmModuleValidatorGetCreateDtoMethod(this.getConfig()))
            .addMethod(new GmModuleValidatorGetUpdateDtoMethod(this.getConfig()))
            .addMethod(new GmModuleValidatorGetDtoMethod(this.getConfig()))
            .addMethod(new GmModuleValidatorGetPaginationMethod(this.getConfig()))
    }

    public api = {
        getCreateDtoSchema: () => {
            return `${this.schemaVarName}.${this.getMethodByIndex(0).renderMethodCall()}`
        },
        getUpdateDtoSchema: () => {
            return `${this.schemaVarName}.${this.getMethodByIndex(1).renderMethodCall()}`
        },
        getDtoPaginationQueryParamsSchema: () => {
            return `${this.schemaVarName}.${this.getMethodByIndex(3).renderMethodCall()}`
        },
    }


}


class GmModuleValidatorGetCreateDtoMethod extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {

    private readonly gmModuleCreateDto: GmModuleCreateDto
    private readonly gmServiceValidator: GmServiceValidator
    private readonly gmServiceObjectSchemaValidatorType: GmServiceObjectSchemaValidatorType

    constructor(config: GmConfig) {
        super(config)
        this.gmModuleCreateDto = new GmModuleCreateDto(config)
        this.gmServiceObjectSchemaValidatorType = new GmServiceObjectSchemaValidatorType()
        this.gmServiceValidator = new GmServiceValidator()
    }

    public getPropertyName(): string {
        return `get${this.gmModuleCreateDto.getPropertyName()}Schema`
    }

    public init(): void {
        this.addModule(this.gmModuleCreateDto)
        this.addService(this.gmServiceObjectSchemaValidatorType)
        this.addService(this.gmServiceValidator)
        this.setReturnType(this.gmServiceObjectSchemaValidatorType.getSchemaValidatorType(this.gmModuleCreateDto.getPropertyName()))

        this.appendBodyElement({
            name: 'return validator',
            value: `return ${this.gmServiceValidator.object(this.buildSchemaByColumns())}`,
        })
    }

    private buildSchemaByColumns(): Record<string, string> {

        const res: Record<string, string> = {}

        for (const key in this.getConfig().model.columns) {
            switch (this.getConfig().model.columns[key].type) {
                case 'INTEGER':
                    res[key] = this.gmServiceValidator.number()
                    break
                case 'BIGINT':
                    res[key] = this.gmServiceValidator.number()
                    break
                case 'FLOAT':
                    res[key] = this.gmServiceValidator.number()
                    break
                case 'BOOLEAN':
                    res[key] = this.gmServiceValidator.boolean()
                    break
                case 'STRING':
                    res[key] = this.gmServiceValidator.string(0, 255)
                    break
                case 'TEXT':
                    res[key] = this.gmServiceValidator.string()
                    break
                case 'DATETIME':
                    res[key] = this.gmServiceValidator.date()
                    break
                case 'JSON':
                    res[key] = this.gmServiceValidator.object({})
                    break
                case 'OBJECT':
                    res[key] = this.gmServiceValidator.object({})
                    break
            }
        }

        return res
    }
}

class GmModuleValidatorGetUpdateDtoMethod extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {

    private readonly gmModuleUpdateDto: GmModuleUpdateDto
    private readonly gmModuleCreateDto: GmModuleCreateDto
    private readonly gmServiceObjectSchemaValidatorType: GmServiceObjectSchemaValidatorType

    constructor(config: GmConfig) {
        super(config)
        this.gmModuleUpdateDto = new GmModuleUpdateDto(config)
        this.gmModuleCreateDto = new GmModuleCreateDto(config)
        this.gmServiceObjectSchemaValidatorType = new GmServiceObjectSchemaValidatorType()
    }

    public getPropertyName(): string {
        return `get${this.gmModuleUpdateDto.getPropertyName()}Schema`
    }

    public getCreatePropertyName(): string {
        return `get${this.gmModuleCreateDto.getPropertyName()}Schema`
    }


    public init(): void {
        this.addModule(this.gmModuleUpdateDto)
        this.addModule(this.gmModuleCreateDto)
        this.addService(this.gmServiceObjectSchemaValidatorType)
        this.setReturnType(this.gmServiceObjectSchemaValidatorType.getSchemaValidatorType(this.gmModuleUpdateDto.getPropertyName()))
        this.appendBodyElement({
            name: 'return schema',
            value: `return this.${this.getCreatePropertyName()}().partial()`,
        })
    }
}

class GmModuleValidatorGetDtoMethod extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {

    private readonly gmModuleDto: GmModuleDto
    private readonly gmModuleCreateDto: GmModuleCreateDto
    private readonly gmServiceSchemaValidatorType: GmServiceSchemaValidatorType
    private readonly gmServiceValidator: GmServiceValidator

    constructor(config: GmConfig) {
        super(config)
        this.gmModuleDto = new GmModuleDto(config)
        this.gmServiceSchemaValidatorType = new GmServiceSchemaValidatorType()
        this.gmServiceValidator = new GmServiceValidator()
        this.gmModuleCreateDto = new GmModuleCreateDto(config)
    }

    public getPropertyName(): string {
        return `get${this.gmModuleDto.getPropertyName()}Schema`
    }

    public getCreatePropertyName(): string {
        return `get${this.gmModuleCreateDto.getPropertyName()}Schema`
    }

    public init(): void {
        this.addModule(this.gmModuleDto)
        this.addService(this.gmServiceSchemaValidatorType)
        this.setReturnType(this.gmServiceSchemaValidatorType.getSchemaValidatorType(this.gmModuleDto.getPropertyName()))
        this.appendBodyElement({
            name: 'return schema',
            value: `return this.${this.getCreatePropertyName()}().merge(${this.gmServiceValidator.object({
                date_add: this.gmServiceValidator.date(),
                date_update: this.gmServiceValidator.date(),
                [GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key]: GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type === 'number' ? this.gmServiceValidator.number() : this.gmServiceValidator.string(),
            })})`,
        })
    }
}

class GmModuleValidatorGetPaginationMethod extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {

    private readonly gmModuleDto: GmModuleDto
    private readonly gmServicePaginationQueryParamsType: GmServicePaginationQueryParamsType
    private readonly gmServiceSchemaValidatorType: GmServiceSchemaValidatorType
    private readonly gmServicePaginationQueryParamsValidator: GmServicePaginationQueryParamsValidator

    constructor(config: GmConfig) {
        super(config)
        this.gmModuleDto = new GmModuleDto(config)
        this.gmServiceSchemaValidatorType = new GmServiceSchemaValidatorType()
        this.gmServicePaginationQueryParamsType = new GmServicePaginationQueryParamsType()
        this.gmServicePaginationQueryParamsValidator = new GmServicePaginationQueryParamsValidator()
    }

    public getPropertyName(): string {
        return `get${this.gmModuleDto.getPropertyName()}PaginationQueryParamsSchema`
    }

    public getDtoPropertyName(): string {
        return `get${this.gmModuleDto.getPropertyName()}Schema`
    }

    public init(): void {
        this.addModule(this.gmModuleDto)
        this.addService(this.gmServicePaginationQueryParamsType)
        this.addService(this.gmServiceSchemaValidatorType)
        this.addService(this.gmServicePaginationQueryParamsValidator)
        this.setReturnType(
            this.gmServiceSchemaValidatorType.getSchemaValidatorType(
                this.gmServicePaginationQueryParamsType.getPaginationQueryParamsType(this.gmModuleDto.getPropertyName()),
            ),
        )
        this.appendBodyElement({
            name: 'return schema',
            value: `return ${this.gmServicePaginationQueryParamsValidator.getSchema(`this.${this.getDtoPropertyName()}()`)}`,
        })
    }
}