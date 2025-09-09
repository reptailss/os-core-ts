import {GmConfig} from '@gm'
import {GmAbstractModuleFnModelNoSql, GmModuleModeApiNoSql, IGmModuleModel, IGmModuleModelApi} from '@gm/core'
import {StringCaseHelper} from '@helpers'


const PROP_VAR_NAMES = {
    month: 'month',
    year: 'year',
} as const

export class GmModuleModelByNoSqlMonthAndYear extends GmAbstractModuleFnModelNoSql implements IGmModuleModel {

    private monthVarName: string
    private yearVarName: string
    private getModelCbVarName: string

    public api: IGmModuleModelApi

    constructor(
        config: GmConfig,
        {
            modelVarName,
            getModelCbVarName,
            monthVarName,
            yearVarName,

        }: {
            modelVarName: string,
            getModelCbVarName: string,
            monthVarName: string,
            yearVarName: string,
        },
    ) {
        super(config)
        this.getModelCbVarName = getModelCbVarName
        this.monthVarName = monthVarName
        this.yearVarName = yearVarName
        this.api = new GmModuleModeApiNoSql(modelVarName)
    }


    public getPropertyName(): string {
        return `get${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Model`
    }

    public getInitModel(): string {
        const monthStr = this.monthVarName === PROP_VAR_NAMES.month ? PROP_VAR_NAMES.month : `${PROP_VAR_NAMES.month}:${this.monthVarName}`
        const yearStr = this.yearVarName === PROP_VAR_NAMES.year ? PROP_VAR_NAMES.year : `${PROP_VAR_NAMES.month}:${this.yearVarName}`
        return `${this.getModelCbVarName}({${monthStr},${yearStr}})`
    }

    public init() {
        super.init()

        this.setPropsType('object')

        this.setAsyncType('async')
        this.setType(this.getModelTypePropertyName())

        this.addProp({
            varName: PROP_VAR_NAMES.month,
            type: 'number',
        })
        this.addProp({
            varName: PROP_VAR_NAMES.year,
            type: 'number',
        })
        const monthStr = this.monthVarName === PROP_VAR_NAMES.month ? PROP_VAR_NAMES.month : `${PROP_VAR_NAMES.month}:${this.monthVarName}`
        const yearStr = this.yearVarName === PROP_VAR_NAMES.year ? PROP_VAR_NAMES.year : `${PROP_VAR_NAMES.month}:${this.yearVarName}`
        this.appendBodyElement({
            name: 'returnModel',
            value: `
            return LoaderModelNoSql.byDatabaseNameAndYearMonth({
                columns:${this.getColumnsPropertyName()},
                collectionName:${this.getCollectionNamePropertyName()},
                databaseName:${this.getDatabaseNamePropertyName()},
                ${monthStr},
                ${yearStr},
            })`,
        })

    }

}