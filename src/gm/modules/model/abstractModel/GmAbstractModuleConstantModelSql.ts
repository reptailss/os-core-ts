import {
    GmAbstractModuleConstant,
    GmModuleConstants,
    GmModuleDto,
    GmModuleModelColumns,
    GmModuleModelType,
    IGmModuleConstant,
} from '@gm/core'
import {StringCaseHelper} from '@helpers'
import {GmConfig} from '@gm'

class GmModuleTableNameConstants extends GmModuleConstants {
}

export abstract class GmAbstractModuleConstantModelSql extends GmAbstractModuleConstant implements IGmModuleConstant {

    private readonly modelType: GmModuleModelType
    private readonly gmModuleDto: GmModuleDto
    private readonly gmModuleModelColumns: GmModuleModelColumns
    private readonly gmModuleTableName: GmModuleConstants

    constructor(config: GmConfig) {
        super(config)
        this.gmModuleModelColumns = new GmModuleModelColumns(config)
        this.modelType = new GmModuleModelType(config)
        this.gmModuleDto = new GmModuleDto(config)
        this.gmModuleTableName = new GmModuleTableNameConstants({
            config,
            value: StringCaseHelper.toSnakeCase(config.moduleName),
            propertyName: this.getTableName(),
        })
    }


    public abstract getPropertyName(): string

    public getDirName(): string {
        return 'model'
    }

    public getFileName(): string {
        return 'index.ts'
    }

    public init() {
        this.setFileWriteMode('appendAfter')
        this.addChildModule(this.gmModuleModelColumns)
        this.addModule(this.gmModuleDto)
        this.addModule(this.modelType, {
            hasAddImport: false,
        })
        this.addChildModule(this.gmModuleTableName)
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'LoaderModelSql',
            isLibImport: true,
        })
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'IModelSql',
            isLibImport: true,
        })
    }

    public getTableNamePropertyName(): string {
        return this.gmModuleTableName.getPropertyName()
    }

    public getColumnsPropertyName(): string {
        return this.gmModuleModelColumns.getPropertyName()
    }

    public getModelTypePropertyName(): string {
        return this.modelType.getPropertyName()
    }


    private getTableName() {
        return `${StringCaseHelper.toSnakeUpperCase(this.getConfig().dtoName.plural)}_TABLE_NAME`
    }
}
