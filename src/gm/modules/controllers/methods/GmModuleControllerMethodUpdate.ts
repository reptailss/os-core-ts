import {
    GmAbstractModuleClassMethod,
    GmAuthDec,
    GmBodyDec,
    GmConfigChecker,
    GmModuleDtoHelper,
    GmModuleRoutePaths,
    GmModuleUpdateDto,
    GmParamDec,
    GmParamNumDec,
    GmPutDec,
    GmServiceBuildResponseFormat,
    GmServiceMutateRowResultType,
    GmServiceUserInfoType,
    GmSwaggerInfoDec,
    IGmModuleClassMethod,
    IGmModuleServiceApiUpdate,
} from '@gm/core'
import {GmConfig} from '@gm'
import {StringCaseHelper} from '@helpers'


export class GmModuleControllerMethodUpdate extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {

    private readonly gmServiceBuildResponseFormat: GmServiceBuildResponseFormat
    private readonly gmServiceMutateRowResultType: GmServiceMutateRowResultType
    private readonly gmModuleUpdateDto: GmModuleUpdateDto
    private readonly gmServiceUserInfoType: GmServiceUserInfoType
    private readonly gmModuleRoutePaths: GmModuleRoutePaths

    constructor(
        config: GmConfig,
        private readonly api: IGmModuleServiceApiUpdate,
        private readonly varNames: {
            updateDto: string
            userInfo: string
            updateDtoSchema: string
            id: string
            updateDtoType?: string
        },
    ) {
        super(config)
        this.gmServiceBuildResponseFormat = new GmServiceBuildResponseFormat()
        this.gmServiceMutateRowResultType = new GmServiceMutateRowResultType()
        this.gmServiceUserInfoType = new GmServiceUserInfoType()
        this.gmModuleUpdateDto = new GmModuleUpdateDto(config)
        this.gmModuleRoutePaths = new GmModuleRoutePaths(config)


    }

    public getPropertyName(): string {
        return `update${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}`
    }

    public init(): void {
        this.addModule(this.gmModuleUpdateDto)
        this.addModule(this.gmModuleRoutePaths)
        this.addService(this.gmServiceBuildResponseFormat)
        this.addService(this.gmServiceMutateRowResultType)
        this.setReturnType(`Promise<${this.gmServiceMutateRowResultType.getMutateRowResultType(GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type as 'string')}>`)

        this.appendDecorator(new GmSwaggerInfoDec(`Update ${this.getConfig().dtoName.singular.toLowerCase()} by id`))
        this.appendDecorator(new GmPutDec(this.gmModuleRoutePaths.getRoutePathPropertyName('update')))


        this.setMethodScope('public')
        this.setAsyncType('async')
        this.addProp({
            type: this.varNames.updateDtoType || this.gmModuleUpdateDto.getPropertyName(),
            varName: this.varNames.updateDto,
            callVarName: this.varNames.updateDto,
            decorator: new GmBodyDec(this.varNames.updateDtoSchema),
        })
        if (GmConfigChecker.hasAuth(this.getConfig(), 'update')) {
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
            value: `const ${this.getNewDtoPropertyVarName()} = await ${this.api.update()}`,
        })

        this.appendBodyElement({
            name: 'return row',
            value: `return ${this.gmServiceBuildResponseFormat.mutateRow(`${this.getNewDtoPropertyVarName()}.${GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key}`)}`,
        })
    }


    private getNewDtoPropertyVarName(): string {
        return 'newDto'
    }
}
