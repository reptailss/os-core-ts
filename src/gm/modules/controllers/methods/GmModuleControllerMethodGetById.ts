import {
    GmAbstractModuleClassMethod,
    GmAuthDec,
    GmConfigChecker, GmGetDec,
    GmModuleDto, GmModuleDtoHelper,
    GmModuleRoutePaths, GmParamDec, GmParamNumDec,
    GmPostDec,
    GmServiceBuildResponseFormat,
    GmServiceRowResultType, GmServiceThrowAppError,
    GmServiceUserInfoType, GmSwaggerInfoDec,
    IGmModuleClassMethod,
    IGmModuleServiceApiGet,
} from '@gm/core'
import {GmConfig} from '@gm'
import {StringCaseHelper} from '@helpers'


export class GmModuleControllerMethodGetById extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {

    private readonly gmServiceBuildResponseFormat: GmServiceBuildResponseFormat
    private readonly gmServiceRowResultType: GmServiceRowResultType
    private readonly gmServiceThrowAppError: GmServiceThrowAppError
    private readonly gmModuleDto: GmModuleDto
    private readonly gmServiceUserInfoType: GmServiceUserInfoType
    private readonly gmModuleRoutePaths: GmModuleRoutePaths

    constructor(
        config: GmConfig,
        private readonly api: IGmModuleServiceApiGet,
        private readonly varNames: {
            userInfo: string
            id: string
        },
    ) {
        super(config)
        this.gmServiceBuildResponseFormat = new GmServiceBuildResponseFormat()
        this.gmServiceRowResultType = new GmServiceRowResultType()
        this.gmServiceUserInfoType = new GmServiceUserInfoType()
        this.gmServiceThrowAppError = new GmServiceThrowAppError()
        this.gmModuleDto = new GmModuleDto(config)
        this.gmModuleRoutePaths = new GmModuleRoutePaths(config)


    }

    public getPropertyName(): string {
        return `get${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}ById`
    }

    public init(): void {
        this.addModule(this.gmModuleDto)
        this.addModule(this.gmModuleRoutePaths)
        this.addService(this.gmServiceBuildResponseFormat)
        this.addService(this.gmServiceRowResultType)
        this.addService(this.gmServiceThrowAppError)
        this.setReturnType(`Promise<${this.gmServiceRowResultType.getRowResultType(this.gmModuleDto.getPropertyName())}>`)
        this.appendDecorator(new GmSwaggerInfoDec(`Get ${this.getConfig().dtoName.singular.toLowerCase()} by id`))
        this.appendDecorator(new GmGetDec(this.gmModuleRoutePaths.getRoutePathPropertyName('get')))

        this.setMethodScope('public')
        this.setAsyncType('async')

        if (GmConfigChecker.hasAuth(this.getConfig(), 'get')) {
            this.addService(this.gmServiceUserInfoType)
            this.addProp({
                type: this.gmServiceUserInfoType.getUserInfoType(),
                varName: this.varNames.userInfo,
                callVarName: this.varNames.userInfo,
                decorator: new GmAuthDec(),
            })
        }
        this.addProp({
            type: GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type,
            varName: this.varNames.id,
            callVarName: this.varNames.id,
            decorator: GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type === 'string' ? new GmParamDec('id') : new GmParamNumDec('id'),
        })
        this.appendBodyElement({
            name: 'create row',
            value: `const ${this.getDtoPropertyVarName()} = await ${this.api.getById()}`,
        })

        this.appendBodyElement({
            name: 'check has row',
            value: this.gmServiceThrowAppError.throwAppError({
                message: 'Not found',
                errorKey: 'NOT_FOUND_ERROR',
                ifConstruction: `!${this.getDtoPropertyVarName()}`,
            }),
        })


        this.appendBodyElement({
            name: 'return row',
            value: `return ${this.gmServiceBuildResponseFormat.row(this.getDtoPropertyVarName())}`,
        })
    }


    private getDtoPropertyVarName(): string {
        return 'dto'
    }
}
