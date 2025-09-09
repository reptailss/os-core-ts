import {
    GmAbstractModuleClassMethod,
    GmAuthDec,
    GmConfigChecker, GmDeleteDec,
    GmModuleDtoHelper,
    GmModuleRoutePaths, GmParamDec,
    GmParamNumDec,
    GmPostDec,
    GmServiceBuildResponseFormat,
    GmServiceMutateRowResultType,
    GmServiceUserInfoType, GmSwaggerInfoDec,
    IGmModuleClassMethod,
    IGmModuleServiceApiDelete,
} from '@gm/core'
import {GmConfig} from '@gm'
import {StringCaseHelper} from '@helpers'


export class GmModuleControllerMethodDelete extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {

    private readonly gmServiceBuildResponseFormat: GmServiceBuildResponseFormat
    private readonly gmServiceMutateRowResultType: GmServiceMutateRowResultType
    private readonly gmServiceUserInfoType: GmServiceUserInfoType
    private readonly gmModuleRoutePaths: GmModuleRoutePaths

    constructor(
        config: GmConfig,
        private readonly api: IGmModuleServiceApiDelete,
        private readonly varNames: {
            userInfo: string
            id: string
        },
    ) {
        super(config)
        this.gmServiceBuildResponseFormat = new GmServiceBuildResponseFormat()
        this.gmServiceMutateRowResultType = new GmServiceMutateRowResultType()
        this.gmServiceUserInfoType = new GmServiceUserInfoType()
        this.gmModuleRoutePaths = new GmModuleRoutePaths(config)


    }

    public getPropertyName(): string {
        return `delete${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}`
    }

    public init(): void {

        this.addModule(this.gmModuleRoutePaths)
        this.addService(this.gmServiceBuildResponseFormat)
        this.addService(this.gmServiceMutateRowResultType)
        this.setReturnType(`Promise<${this.gmServiceMutateRowResultType.getMutateRowResultType(GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type as 'string')}>`)
        this.appendDecorator(new GmSwaggerInfoDec(`Delete ${this.getConfig().dtoName.singular.toLowerCase()}`))
        this.appendDecorator(new GmDeleteDec(this.gmModuleRoutePaths.getRoutePathPropertyName('delete')))



        this.setMethodScope('public')
        this.setAsyncType('async')

        if (GmConfigChecker.hasAuth(this.getConfig(), 'delete')) {
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
            decorator: GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type === 'string' ?  new GmParamDec('id') : new GmParamNumDec('id')
        })
        this.appendBodyElement({
            name: 'create row',
            value: `const ${this.getOldDtoPropertyVarName()} = await ${this.api.delete()}`,
        })

        this.appendBodyElement({
            name: 'return row',
            value: `return ${this.gmServiceBuildResponseFormat.mutateRow(`${this.getOldDtoPropertyVarName()}.${GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key}`)}`,
        })
    }


    private getOldDtoPropertyVarName(): string {
        return 'oldDto'
    }
}
