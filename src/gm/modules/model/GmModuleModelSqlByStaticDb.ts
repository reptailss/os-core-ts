import {GmConfig} from '@gm'
import {
    GmAbstractModuleConstantModelSql,
    GmModuleDbConnectionSql,
    GmModuleModeApiSql,
    IGmModuleModel,
    IGmModuleModelApi,
} from '@gm/core'
import {StringCaseHelper} from '@helpers'


export class GmModuleModelSqlByStaticDb extends GmAbstractModuleConstantModelSql implements IGmModuleModel {

    public api: IGmModuleModelApi

    private gmModuleDbConnectionSql: GmModuleDbConnectionSql

    constructor(
        config: GmConfig,
        modelVarName: string,
    ) {
        super(config)
        this.gmModuleDbConnectionSql = new GmModuleDbConnectionSql(config)
        this.api = new GmModuleModeApiSql(modelVarName)
    }

    public getPropertyName(): string {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Model`
    }

    public init() {

        super.init()

        this.addModule(this.gmModuleDbConnectionSql)
        this.setType(this.getModelTypePropertyName())

        this.setBody(
            `LoaderModelSql.staticByDbConnection({
                 columns:${this.getColumnsPropertyName()},
                 tableName:${this.getTableNamePropertyName()},
                dbConnection:${this.gmModuleDbConnectionSql.getPropertyName()},
            })`)


    }

}
