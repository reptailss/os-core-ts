"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceMethodDelete = void 0;
const core_1 = require("../../../core");
const PROPS_VAR_NAMES = {
    initiatorOpenUserId: 'initiatorOpenUserId',
    id: 'id',
};
class GmModuleServiceMethodDelete extends core_1.GmAbstractModuleClassMethod {
    constructor(config, gmModuleModel, gmServiceSendActionSystemLog, callVarNames) {
        super(config);
        this.gmModuleDto = new core_1.GmModuleDto(config);
        this.gmServiceThrowAppError = new core_1.GmServiceThrowAppError();
        this.gmServiceSendActionSystemLog = new core_1.GmServiceActionsLoggerService();
        this.gmServiceSendActionSystemLog = gmServiceSendActionSystemLog;
        this.gmModuleModel = gmModuleModel;
        this.callVarNames = callVarNames;
    }
    getPropertyName() {
        return `delete${this.getConfig().dtoName.singular}ById`;
    }
    init() {
        this.addModule(this.gmModuleDto);
        this.addService(this.gmServiceThrowAppError);
        this.setMethodScope('public');
        this.setAsyncType('async');
        if (core_1.GmConfigChecker.hasActionLogger(this.getConfig(), 'delete')) {
            this.addProp({
                varName: PROPS_VAR_NAMES.initiatorOpenUserId,
                callVarName: this.callVarNames.initiatorOpenUserId,
                type: 'number',
                decorator: null,
            });
        }
        this.setPropsType('object');
        this.addProp({
            varName: PROPS_VAR_NAMES.id,
            callVarName: this.callVarNames.id,
            type: core_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type,
            decorator: null,
        });
        this.setReturnType(`Promise<${this.gmModuleDto.getPropertyName()}>`);
        this.checkHasOldDto();
        this.deleteRow();
    }
    checkHasOldDto() {
        this.appendBodyElement({
            name: 'foundRow',
            value: `const ${this.getOldDtoVarName()} = await ${this.gmModuleModel.api.findOne({
                filters: {
                    [core_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key]: PROPS_VAR_NAMES.id,
                },
            })}`,
        });
        this.appendBodyElement({
            name: 'errorFoundRow',
            value: this.gmServiceThrowAppError.throwAppError({
                message: 'Not found',
                errorKey: 'NOT_FOUND_ERROR',
                ifConstruction: `!${this.getOldDtoVarName()}`,
            }),
        });
    }
    deleteRow() {
        this.appendBodyElement({
            name: 'deleteRow',
            value: `await ${this.gmModuleModel.api.destroy({
                filters: {
                    [core_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key]: PROPS_VAR_NAMES.id,
                },
            })}`,
            hasEmptyLineAtEnd: true,
        });
        if (core_1.GmConfigChecker.hasActionLogger(this.getConfig(), 'delete')) {
            this.appendBodyElement({
                name: 'SendActionSystemLogService',
                value: `await ${this.gmServiceSendActionSystemLog.logDeleteAction({
                    rowId: PROPS_VAR_NAMES.id,
                    oldValue: this.getOldDtoVarName(),
                    config: this.gmModuleModel.api.getConfig(),
                    initiatorOpenUserId: PROPS_VAR_NAMES.initiatorOpenUserId,
                })}`,
                hasEmptyLineAtEnd: true,
            });
        }
        this.appendBodyElement({
            name: 'return oldDto',
            value: `return ${this.getOldDtoVarName()}`,
        });
    }
    getOldDtoVarName() {
        return 'oldDto';
    }
}
exports.GmModuleServiceMethodDelete = GmModuleServiceMethodDelete;
//# sourceMappingURL=GmModuleServiceMethodDelete.js.map