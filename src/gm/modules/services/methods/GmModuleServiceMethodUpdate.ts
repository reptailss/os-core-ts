import {GmConfig} from '@gm'
import {
    GmAbstractModuleClassMethod,
    GmConfigChecker,
    GmModuleDto,
    GmModuleDtoHelper,
    GmModuleUpdateDto,
    GmServiceActionsLoggerService,
    GmServiceThrowAppError,
    IGmModuleClassMethod,
    IGmModuleModel,
} from '@gm/core'
import {StringCaseHelper} from '@helpers'


const PROPS_VAR_NAMES = {
    initiatorOpenUserId: 'initiatorOpenUserId',
    updateDto: 'updateDto',
    id: 'id',
}

export class GmModuleServiceMethodUpdate extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    private readonly gmModuleDto: GmModuleDto
    private readonly gmModuleUpdateDto: GmModuleUpdateDto
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
        this.gmModuleUpdateDto = new GmModuleUpdateDto(config)
        this.gmServiceThrowAppError = new GmServiceThrowAppError()
        this.gmServiceSendActionSystemLog = gmServiceSendActionSystemLog
        this.gmModuleModel = gmModuleModel
        this.callVarNames = callVarNames
    }
    
    
    public getPropertyName(): string {
        return `update${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}`
    }
    
    public init(): void {
        
        this.addModule(this.gmModuleDto)
        this.addModule(this.gmModuleUpdateDto)
        this.addService(this.gmServiceThrowAppError)
        
        this.setMethodScope('public')
        this.setAsyncType('async')
        
        if (GmConfigChecker.hasActionLogger(this.getConfig(), 'update')) {
            this.addService(this.gmServiceSendActionSystemLog)
            this.addProp({
                varName: PROPS_VAR_NAMES.initiatorOpenUserId,
                callVarName: this.callVarNames.initiatorOpenUserId,
                type: 'number',
                decorator: null,
            })
        }
        
        this.setReturnType(`Promise<${this.gmModuleDto.getPropertyName()}>`)
        this.setPropsType('object')
        
        this.addProp({
            varName: PROPS_VAR_NAMES.updateDto,
            callVarName: this.callVarNames.updateDto,
            type: this.gmModuleUpdateDto.getPropertyName(),
            decorator: null,
        })
        this.addProp({
            varName: PROPS_VAR_NAMES.id,
            callVarName: this.callVarNames.id,
            type: GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type,
            decorator: null,
        })
        
        this.checkHasRow()
        
        this.updateRow()
        
    }
    
    private checkHasRow(): void {
        
        this.appendBodyElement({
            name: 'getOldRow',
            value: `const ${this.getOldDtoVarName()}  = await ${this.gmModuleModel.api.findByPk(PROPS_VAR_NAMES.id)}`,
        })
        
        this.appendBodyElement({
            name: 'checkOldRow',
            value: this.gmServiceThrowAppError.throwAppError({
                message: 'Not found.',
                errorKey: 'NOT_FOUND_ERROR',
                ifConstruction: `!${this.getOldDtoVarName()}`,
            }),
            hasEmptyLineAtEnd: true,
        })
    }
    
    
    private updateRow() {
        if (!GmConfigChecker.hasActionLogger(this.getConfig(), 'add')) {
            this.appendBodyElement({
                name: 'returnNewRow',
                value: `return ${this.gmModuleModel.api.update(PROPS_VAR_NAMES.updateDto, {
                    filters: {
                        [GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key]: PROPS_VAR_NAMES.id,
                    },
                    returning: true,
                })}`,
            })
            return
        }
        
        this.appendBodyElement({
            name: 'returnNewRow',
            value: `const ${this.getNewDtoVarName()} = await ${this.gmModuleModel.api.update(PROPS_VAR_NAMES.updateDto, {
                filters: {
                    [GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key]: PROPS_VAR_NAMES.id,
                },
                returning: true,
            })}`,
        })
        
        this.appendBodyElement({
            name: 'SendActionSystemLogService',
            value: `await ${this.gmServiceSendActionSystemLog.logUpdateAction({
                rowId: PROPS_VAR_NAMES.id,
                oldValue: this.getOldDtoVarName(),
                newValue: this.getNewDtoVarName(),
                config: this.gmModuleModel.api.getConfig(),
                initiatorOpenUserId: PROPS_VAR_NAMES.initiatorOpenUserId,
            })}`,
            hasEmptyLineAtEnd: true,
        })
        
        this.appendBodyElement({
            name: 'return row',
            value: `return ${this.getNewDtoVarName()}`,
        })
    }
    
    private getNewDtoVarName(): string {
        return 'newDto'
    }
    
    private getOldDtoVarName(): string {
        return 'oldDto'
    }
    
    private getOldDtoVarNameByUniqFields(): string {
        return 'oldDtoByUniqFields'
    }
}
