import {
    GmAbstractModuleClassMethod,
    GmConfigChecker,
    GmModuleCreateDto,
    GmModuleDto,
    GmModuleDtoHelper,
    GmServiceActionsLoggerService,
    GmServiceThrowAppError,
    IGmModuleClassMethod,
    IGmModuleModel,
} from '@gm/core'
import {GmConfig} from '@gm'
import {StringCaseHelper} from '@helpers'


const PROPS_VAR_NAMES = {
    initiatorOpenUserId: 'initiatorOpenUserId',
    createDto: 'createDto',
}

export class GmModuleServiceMethodCreate extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    private readonly gmModuleDto: GmModuleDto
    private readonly gmModuleCreateDto: GmModuleCreateDto
    private readonly gmServiceThrowAppError: GmServiceThrowAppError
    private readonly gmServiceSendActionSystemLog: GmServiceActionsLoggerService
    private readonly gmModuleModel: IGmModuleModel
    private readonly callVarNames: typeof PROPS_VAR_NAMES
    
    constructor(
        config: GmConfig,
        gmModuleModel: IGmModuleModel,
        gmServiceSendActionSystemLog: GmServiceActionsLoggerService,
        callVarNames: typeof PROPS_VAR_NAMES,
    ) {
        super(config)
        
        this.gmModuleDto = new GmModuleDto(config)
        this.gmModuleCreateDto = new GmModuleCreateDto(config)
        this.gmServiceThrowAppError = new GmServiceThrowAppError()
        this.gmServiceSendActionSystemLog = gmServiceSendActionSystemLog
        this.gmModuleModel = gmModuleModel
        this.callVarNames = callVarNames
        
    }
    
    public getPropertyName(): string {
        return `create${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}`
    }
    
    public init(): void {
        
        this.addModule(this.gmModuleDto)
        this.addModule(this.gmModuleCreateDto)
        this.addService(this.gmServiceThrowAppError)
        
        this.setMethodScope('public')
        this.setAsyncType('async')
        
        this.setReturnType(`Promise<${this.gmModuleDto.getPropertyName()}>`)
        this.setPropsType('object')
        
        if (GmConfigChecker.hasActionLogger(this.getConfig(), 'add')) {
            this.addProp({
                varName: PROPS_VAR_NAMES.initiatorOpenUserId,
                callVarName: this.callVarNames.initiatorOpenUserId,
                type: 'number',
                decorator: null,
            })
        }
        this.addProp({
            varName: PROPS_VAR_NAMES.createDto,
            callVarName: this.callVarNames.createDto,
            type: this.gmModuleCreateDto.getPropertyName(),
            decorator: null,
        })
        
        this.createRow()
        
    }
    
    private createRow(): void {
        if (!GmConfigChecker.hasActionLogger(this.getConfig(), 'add')) {
            this.appendBodyElement({
                name: 'createRow',
                value: `return ${this.gmModuleModel.api.create(PROPS_VAR_NAMES.createDto)}`,
                hasEmptyLineAtEnd: false,
            })
            return
        }
        
        this.appendBodyElement({
            name: 'createRow',
            value: `const ${this.getNewDtoPropertyVarName()} = await ${this.gmModuleModel.api.create(PROPS_VAR_NAMES.createDto)}`,
            hasEmptyLineAtEnd: false,
        })
        
        this.appendBodyElement({
            name: 'SendActionSystemLogService',
            value: `await ${this.gmServiceSendActionSystemLog.logCreateAction({
                rowId: `${this.getNewDtoPropertyVarName()}.${GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key}`,
                value: this.getNewDtoPropertyVarName(),
                config: this.gmModuleModel.api.getConfig(),
                initiatorOpenUserId: PROPS_VAR_NAMES.initiatorOpenUserId,
            })}`,
            hasEmptyLineAtEnd: true,
        })
        
        this.appendBodyElement({
            name: 'returnNewRow',
            value: `return ${this.getNewDtoPropertyVarName()}`,
        })
        
    }
    
    private getNewDtoPropertyVarName(): string {
        return 'newDto'
    }
}
