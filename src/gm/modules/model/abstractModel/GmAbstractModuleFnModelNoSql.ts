import {
    GmAbstractModuleFn,
    GmModuleConstants,
    GmModuleDto,
    GmModuleModelColumns,
    GmModuleModelType,
    IGmModuleFn,
} from '@gm/core'
import {StringCaseHelper} from '@helpers'
import {GmConfig} from '@gm'


class GmModuleDatabaseNameConstants extends GmModuleConstants {

    constructor(config: GmConfig, collectionName: string) {
        super({
            config,
            value: StringCaseHelper.toSnakeCase(config.moduleName),
            propertyName: collectionName,
            mode: 'appendAfter',
        })
    }

}

class GmModuleCollectionNameConstants extends GmModuleConstants {
    constructor(config: GmConfig, databaseName: string) {
        super({
            config,
            value: StringCaseHelper.toSnakeCase(config.moduleName),
            propertyName: databaseName,
            mode: 'appendAfter',
        })
    }
}

export abstract class GmAbstractModuleFnModelNoSql extends GmAbstractModuleFn implements IGmModuleFn {

    private readonly modelType: GmModuleModelType
    private readonly gmModuleDto: GmModuleDto
    private readonly gmModuleModelColumns: GmModuleModelColumns
    private readonly gmModuleCollectionName: GmModuleConstants
    private readonly gmModuleDatabaseName: GmModuleConstants

    constructor(config: GmConfig) {
        super(config)
        this.gmModuleModelColumns = new GmModuleModelColumns(config)
        this.modelType = new GmModuleModelType(config)
        this.gmModuleDto = new GmModuleDto(config)

        this.gmModuleCollectionName = new GmModuleCollectionNameConstants(
            config,
            this.getCollectionName(),
        )
        this.gmModuleDatabaseName = new GmModuleDatabaseNameConstants(
            config, this.getDatabaseName(),
        )
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
        this.addModule(this.modelType, {
            hasAddImport: false,
        })
        this.addModule(this.gmModuleDto)
        this.addChildModule(this.gmModuleCollectionName)
        this.addChildModule(this.gmModuleDatabaseName)
        this.addChildModule(this.gmModuleModelColumns)


        this.addImport({
            path: 'os-core-ts',
            propertyName: 'LoaderModelNoSql',
            isLibImport: true,
        })
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'IModelNoSql',
            isLibImport: true,
        })
    }

    public getColumnsPropertyName(): string {
        return this.gmModuleModelColumns.getPropertyName()
    }

    public getCollectionNamePropertyName(): string {
        return this.gmModuleCollectionName.getPropertyName()
    }

    public getDatabaseNamePropertyName(): string {
        return this.gmModuleDatabaseName.getPropertyName()
    }

    public getModelTypePropertyName(): string {
        return this.modelType.getPropertyName()
    }

    private getCollectionName() {
        return `${StringCaseHelper.toSnakeUpperCase(this.getConfig().dtoName.plural)}_COLLECTION_NAME`
    }

    private getDatabaseName() {
        return `${StringCaseHelper.toSnakeUpperCase(this.getConfig().dtoName.plural)}_DATABASE_NAME`
    }
}
