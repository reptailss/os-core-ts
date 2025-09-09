import {StringCaseHelper} from '@helpers'
import {GmAbstractModuleFnModelSql, GmModuleModeApiSql, IGmModuleModel, IGmModuleModelApi} from '@gm/core'
import {GmConfig} from '@gm'

const PROP_VAR_NAMES = {
    legalEntityId: 'legalEntityId',
} as const

export class GmModuleModelSqlByDynamicLeId extends GmAbstractModuleFnModelSql implements IGmModuleModel {

    public api: IGmModuleModelApi

    private getModelCbVarName: string
    private leIdVarName: string

    constructor(
        config: GmConfig,
        {
            modelVarName,
            getModelCbVarName,
            leIdVarName,
        }: {
            modelVarName: string,
            getModelCbVarName: string,
            leIdVarName: string,
        },
    ) {
        super(config)
        this.getModelCbVarName = getModelCbVarName
        this.leIdVarName = leIdVarName
        this.api = new GmModuleModeApiSql(modelVarName)
    }

    public getPropertyName(): string {
        return `get${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Model`
    }

    public getInitModel(): string {
        return `${this.getModelCbVarName}(${this.leIdVarName})`
    }


    public init() {
        super.init()

        this.addProp({
            varName: PROP_VAR_NAMES.legalEntityId,
            type: 'number',
        })

        this.setAsyncType('async')
        this.setType(this.getModelTypePropertyName())

        this.appendBodyElement({
            name: 'returnModel',
            value: `
            return LoaderModelSql.dynamicDbConfigByLegalEntityId({
                columns:${this.getColumnsPropertyName()},
                tableName:${this.getTableNamePropertyName()},
                ${PROP_VAR_NAMES.legalEntityId},
            })`,
        })

    }

}