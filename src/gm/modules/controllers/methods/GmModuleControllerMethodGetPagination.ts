import {
    GmAbstractModuleClassMethod,
    GmAuthDec,
    GmConfigChecker, GmGetDec,
    GmModuleDto,
    GmModuleRoutePaths,
    GmPaginationQueryParamsDec,
    GmPostDec,
    GmServiceBuildResponseFormat,
    GmServicePaginationQueryParamsType,
    GmServicePaginationValues,
    GmServiceUserInfoType, GmSwaggerInfoDec,
    IGmModuleClassMethod,
    IGmModuleServiceApiGetPagination,
} from '@gm/core'
import {GmConfig} from '@gm'
import {StringCaseHelper} from '@helpers'


export class GmModuleControllerMethodGetPagination extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {

    private readonly gmServiceBuildResponseFormat: GmServiceBuildResponseFormat
    private readonly gmServicePaginationValues: GmServicePaginationValues
    private readonly gmServicePaginationQueryParamsType: GmServicePaginationQueryParamsType
    private readonly gmModuleDto: GmModuleDto
    private readonly gmServiceUserInfoType: GmServiceUserInfoType
    private readonly gmModuleRoutePaths: GmModuleRoutePaths

    constructor(
        config: GmConfig,
        private readonly api: IGmModuleServiceApiGetPagination,
        private readonly varNames: {
            userInfo: string
            params: string
            paramsSchema: string
        },
    ) {
        super(config)
        this.gmServiceBuildResponseFormat = new GmServiceBuildResponseFormat()
        this.gmServicePaginationValues = new GmServicePaginationValues()
        this.gmServicePaginationQueryParamsType = new GmServicePaginationQueryParamsType()
        this.gmServiceUserInfoType = new GmServiceUserInfoType()
        this.gmModuleDto = new GmModuleDto(config)
        this.gmModuleRoutePaths = new GmModuleRoutePaths(config)


    }

    public getPropertyName(): string {
        return `get${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Pagination`
    }

    public init(): void {
        this.addModule(this.gmModuleDto)
        this.addModule(this.gmModuleRoutePaths)
        this.addService(this.gmServiceBuildResponseFormat)
        this.addService(this.gmServicePaginationValues)
        this.addService(this.gmServicePaginationQueryParamsType)
        this.setReturnType(`Promise<${this.gmServicePaginationValues.getPaginationResultType(this.gmModuleDto.getPropertyName())}>`)

        this.appendDecorator(new GmSwaggerInfoDec(`Get ${this.getConfig().dtoName.plural.toLowerCase()} list`))
        this.appendDecorator(new GmGetDec(this.gmModuleRoutePaths.getRoutePathPropertyName('list')))

        this.setMethodScope('public')
        this.setAsyncType('async')

        if (GmConfigChecker.hasAuth(this.getConfig(), 'list')) {
            this.addService(this.gmServiceUserInfoType)
            this.addProp({
                type: this.gmServiceUserInfoType.getUserInfoType(),
                varName: this.varNames.userInfo,
                callVarName: this.varNames.userInfo,
                decorator: new GmAuthDec(),
            })
        }
        this.addProp({
            type: this.gmServicePaginationQueryParamsType.getPaginationQueryParamsType(this.gmModuleDto.getPropertyName()),
            decorator: new GmPaginationQueryParamsDec(this.varNames.paramsSchema),
            callVarName: this.varNames.params,
            varName: this.varNames.params,
        })
        this.appendBodyElement({
            name: 'create row',
            value: `const ${this.getPaginationValuesVarName()} = await ${this.api.getPagination()}`,
        })

        this.appendBodyElement({
            name: 'return pagination',
            value: `return ${this.gmServiceBuildResponseFormat.pagination(this.getPaginationValuesVarName())}`,
        })
    }


    private getPaginationValuesVarName(): string {
        return 'paginationValues'
    }
}
