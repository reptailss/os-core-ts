import {GmConfig} from '@gm'
import {
    GmAbstractModuleClassMethod,
    GmModuleDto,
    GmServicePaginationNoSql,
    GmServicePaginationQueryParamsType,
    GmServicePaginationValuesType,
    IGmModuleClassMethod,
    IGmModuleModel,
} from '@gm/core'
import {StringCaseHelper} from '@helpers'


const PROPS_VAR_NAMES = {
    params: 'params',
    dateStart: 'dateStart',
    dateEnd: 'dateEnd',
}

export class GmModuleServiceMethodGetPaginationNoSql extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {

    private readonly gmModuleDto: GmModuleDto
    private readonly gmServicePaginationQueryParamsType: GmServicePaginationQueryParamsType
    private readonly gmServicePaginationValuesType: GmServicePaginationValuesType
    private readonly gmServicePaginationNoSql: GmServicePaginationNoSql
    private readonly callVarNames:typeof PROPS_VAR_NAMES
    
    constructor(
        config: GmConfig,
        gmModuleModel: IGmModuleModel,
        callVarNames:typeof PROPS_VAR_NAMES
    ) {
        super(config)
        this.gmModuleDto = new GmModuleDto(config)
        this.gmServicePaginationQueryParamsType = new GmServicePaginationQueryParamsType()
        this.gmServicePaginationValuesType = new GmServicePaginationValuesType()
        this.gmServicePaginationNoSql = new GmServicePaginationNoSql()
        this.callVarNames = callVarNames

    }

    public getPropertyName(): string {
        return `get${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Pagination`
    }

    public init(): void {
        this.addModule(this.gmModuleDto)
        this.addService(this.gmServicePaginationQueryParamsType)
        this.addService(this.gmServicePaginationValuesType)
        this.addService(this.gmServicePaginationNoSql)

        this.setMethodScope('public')
        this.setAsyncType('async')

        this.addProp({
            varName: PROPS_VAR_NAMES.params,
            callVarName:this.callVarNames.params,
            type: this.gmServicePaginationQueryParamsType.getPaginationQueryParamsType(this.gmModuleDto.getPropertyName()),
            decorator: null,
        })

        this.addProp({
            varName: PROPS_VAR_NAMES.dateStart,
            callVarName:this.callVarNames.dateStart,
            type: 'Date',
            decorator: null,
        })

        this.addProp({
            varName: PROPS_VAR_NAMES.dateEnd,
            callVarName:this.callVarNames.dateEnd,
            type: 'Date',
            decorator: null,
        })

        this.setReturnType(`Promise<${this.gmServicePaginationValuesType.getPaginationValuesType(this.gmModuleDto.getPropertyName())}>`)

        this.appendBodyElement({
            name: 'returnPagination',
            value: `return ${this.gmServicePaginationNoSql.getPagination({
                paramsVarName: PROPS_VAR_NAMES.params,
                dateStartVarName: PROPS_VAR_NAMES.dateStart,
                dateEndVarName: PROPS_VAR_NAMES.dateEnd,
                getModelCbVarName: 'this.getModelCb',
            })}`,
        })
    }
}
