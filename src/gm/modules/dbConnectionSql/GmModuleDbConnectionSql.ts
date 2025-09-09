import { GmAbstractModuleConstant, IGmModule} from '@gm/core'


export class GmModuleDbConnectionSql extends GmAbstractModuleConstant implements IGmModule {

    public getPropertyName(): string {
        return 'dbConnectionStaticSql'
    }


    public getDirName(): string {
        return 'db'
    }

    public getFileName(): string {
        return 'dbConnection.ts'
    }


    public init(): void {
        this.setBody('DbConnectionSqlFactory.getStatic()')
        this.setFileWriteMode('skipIfExists')
        this.setDirType('root')
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'DbConnectionSqlFactory',
            isLibImport: true,
            dirType: 'modules',
        })
    }

}
