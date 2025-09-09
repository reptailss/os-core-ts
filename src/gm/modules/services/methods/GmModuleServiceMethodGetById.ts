import {GmConfig} from '@gm'
import {
    GmAbstractModuleClassMethod,
    GmModuleDto,
    GmModuleDtoHelper,
    IGmModuleClassMethod,
    IGmModuleModel,
} from '@gm/core'
import {StringCaseHelper} from '@helpers'

const PROPS_VAR_NAMES = {
    id: 'id',
}

export  class GmModuleServiceMethodGetById extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {

    private readonly gmModuleDto: GmModuleDto
    private readonly gmModuleModel: IGmModuleModel
    private readonly callVarNames:typeof PROPS_VAR_NAMES
    
    constructor(
        config: GmConfig,
        gmModuleModel: IGmModuleModel,
        callVarNames:typeof PROPS_VAR_NAMES
    ) {
        super(config)

        this.gmModuleDto = new GmModuleDto(config)
        this.gmModuleModel = gmModuleModel
        this.callVarNames = callVarNames
    }

    public getPropertyName(): string {
        return `get${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}ById`
    }

    public init(): void {
        this.addModule(this.gmModuleDto)
        this.setReturnType(`Promise<${this.gmModuleDto.getPropertyName()} | null>`)

        this.setMethodScope('public')
        this.setAsyncType('async')

        this.addProp({
            varName: PROPS_VAR_NAMES.id,
            callVarName:this.callVarNames.id,
            type: GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type,
            decorator: null,
        })

        this.initGetRow()
    }

    private initGetRow() {
        this.appendBodyElement({
            name: 'getRow',
            value: `return ${this.gmModuleModel.api.findByPk(PROPS_VAR_NAMES.id)}`,
        })
    }


}
