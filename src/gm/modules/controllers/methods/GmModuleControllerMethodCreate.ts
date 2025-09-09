import {
    GmAbstractModuleClassMethod,
    GmAuthDec,
    GmBodyDec,
    GmConfigChecker,
    GmModuleCreateDto,
    GmModuleDtoHelper,
    GmModuleRoutePaths,
    GmPostDec,
    GmServiceBuildResponseFormat,
    GmServiceMutateRowResultType,
    GmServiceUserInfoType,
    GmSwaggerInfoDec,
    IGmModuleClassMethod,
    IGmModuleServiceApiCreate,
} from '@gm/core'
import {GmConfig} from '@gm'
import {StringCaseHelper} from '@helpers'


export class GmModuleControllerMethodCreate extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {

    private readonly gmServiceBuildResponseFormat: GmServiceBuildResponseFormat
    private readonly gmServiceMutateRowResultType: GmServiceMutateRowResultType
    private readonly gmModuleCreateDto: GmModuleCreateDto
    private readonly gmServiceUserInfoType: GmServiceUserInfoType
    private readonly gmModuleRoutePaths: GmModuleRoutePaths

    constructor(
        config: GmConfig,
        private readonly api: IGmModuleServiceApiCreate,
        private readonly varNames: {
            createDto: string
            userInfo: string
            createDtoSchema: string
            createDtoType?:string
        },
    ) {
        super(config)
        this.gmServiceBuildResponseFormat = new GmServiceBuildResponseFormat()
        this.gmServiceMutateRowResultType = new GmServiceMutateRowResultType()
        this.gmServiceUserInfoType = new GmServiceUserInfoType()
        this.gmModuleCreateDto = new GmModuleCreateDto(config)
        this.gmModuleRoutePaths = new GmModuleRoutePaths(config)


    }

    public getPropertyName(): string {
        return `create${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}`
    }

    public init(): void {
        this.addModule(this.gmModuleCreateDto)
        this.addModule(this.gmModuleRoutePaths)
        this.addService(this.gmServiceBuildResponseFormat)
        this.addService(this.gmServiceMutateRowResultType)
        this.setReturnType(`Promise<${this.gmServiceMutateRowResultType.getMutateRowResultType(GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type as 'string')}>`)
        this.appendDecorator(new GmSwaggerInfoDec(`Add new ${this.getConfig().dtoName.singular.toLowerCase()}`))
        this.appendDecorator(new GmPostDec(this.gmModuleRoutePaths.getRoutePathPropertyName('add')))


        this.setAsyncType('async')
        this.setMethodScope('public')
        this.addProp({
            type: this.varNames.createDtoType || this.gmModuleCreateDto.getPropertyName(),
            varName: this.varNames.createDto,
            callVarName: this.varNames.createDto,
            decorator: new GmBodyDec(this.varNames.createDtoSchema),
        })
        if (GmConfigChecker.hasAuth(this.getConfig(), 'add')) {
            this.addService(this.gmServiceUserInfoType)
            this.addProp({
                type: this.gmServiceUserInfoType.getUserInfoType(),
                varName: this.varNames.userInfo,
                callVarName: this.varNames.userInfo,
                decorator: new GmAuthDec(),
            })
        }

        this.appendBodyElement({
            name: 'create row',
            value: `const ${this.getNewDtoPropertyVarName()} = await ${this.api.create()}`,
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
