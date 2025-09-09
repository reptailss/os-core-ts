import {GmAbstractModuleType, IGmModuleType} from '@gm/core'
import {StringCaseHelper} from '@helpers'


export class GmModuleModelType extends GmAbstractModuleType implements IGmModuleType {


    public getPropertyName(): string {
        switch (this.getConfig().model.type) {
            case 'staticByDbConnection':
                return `${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Model`
            case 'dynamicByDomain':
                return `Get${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}ModelCb`
            case 'dynamicDbConfigByLegalEntityId':
                return `Get${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}ModelCb`
            case 'byDatabaseNameAndYearMonth':
                return `Get${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}ModelCb`
            default:
                return ''
        }
    }

    public getDirName(): string {
        return 'model'
    }

    public getFileName(): string {
        return 'index.ts'
    }

    public init(): void {
        this.setFileWriteMode('appendAfter')

        switch (this.getConfig().model.dbType) {
            case 'noSql': {
                this.addImport({
                    path: 'os-core-ts',
                    propertyName: 'IModelNoSql',
                    isLibImport: true,
                })
                break
            }
            case 'sql': {
                this.addImport({
                    path: 'os-core-ts',
                    propertyName: 'IModelSql',
                    isLibImport: true,
                })
                break
            }
        }

        switch (this.getConfig().model.type) {
            case 'staticByDbConnection': {
                this.setBody(`IModelSql<${this.getDtoName()}>`)
                break
            }
            case 'dynamicByDomain': {
                this.setBody(`(domain:string)=>Promise<IModelSql<${this.getDtoName()}>>`)
                break
            }
            case 'dynamicDbConfigByLegalEntityId': {
                this.setBody(`(legalEntityId:number)=>Promise<IModelSql<${this.getDtoName()}>>`)
                break
            }
            case 'byDatabaseNameAndYearMonth': {
                this.setBody(`(props:{month:number,year:number})=>Promise<IModelNoSql<${this.getDtoName()}>>`)
                break
            }
        }

    }

    private getDtoName(): string {
        return `${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Dto`
    }
}
