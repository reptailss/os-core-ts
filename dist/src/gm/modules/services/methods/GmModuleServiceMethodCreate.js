"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceMethodCreate = void 0;
const core_1 = require("../../../core");
const _helpers_1 = require("../../../../helpers");
const PROPS_VAR_NAMES = {
    initiatorOpenUserId: 'initiatorOpenUserId',
    createDto: 'createDto',
};
class GmModuleServiceMethodCreate extends core_1.GmAbstractModuleClassMethod {
    constructor(config, gmModuleModel, gmServiceSendActionSystemLog, callVarNames) {
        super(config);
        this.gmModuleDto = new core_1.GmModuleDto(config);
        this.gmModuleCreateDto = new core_1.GmModuleCreateDto(config);
        this.gmServiceThrowAppError = new core_1.GmServiceThrowAppError();
        this.gmServiceSendActionSystemLog = gmServiceSendActionSystemLog;
        this.gmModuleModel = gmModuleModel;
        this.callVarNames = callVarNames;
    }
    getPropertyName() {
        return `create${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}`;
    }
    init() {
        this.addModule(this.gmModuleDto);
        this.addModule(this.gmModuleCreateDto);
        this.addService(this.gmServiceThrowAppError);
        this.setMethodScope('public');
        this.setAsyncType('async');
        this.setReturnType(`Promise<${this.gmModuleDto.getPropertyName()}>`);
        this.setPropsType('object');
        if (core_1.GmConfigChecker.hasActionLogger(this.getConfig(), 'add')) {
            this.addProp({
                varName: PROPS_VAR_NAMES.initiatorOpenUserId,
                callVarName: this.callVarNames.initiatorOpenUserId,
                type: 'number',
                decorator: null,
            });
        }
        this.addProp({
            varName: PROPS_VAR_NAMES.createDto,
            callVarName: this.callVarNames.createDto,
            type: this.gmModuleCreateDto.getPropertyName(),
            decorator: null,
        });
        this.createRow();
    }
    createRow() {
        if (!core_1.GmConfigChecker.hasActionLogger(this.getConfig(), 'add')) {
            this.appendBodyElement({
                name: 'createRow',
                value: `return ${this.gmModuleModel.api.create(PROPS_VAR_NAMES.createDto)}`,
                hasEmptyLineAtEnd: false,
            });
            return;
        }
        this.appendBodyElement({
            name: 'createRow',
            value: `const ${this.getNewDtoPropertyVarName()} = await ${this.gmModuleModel.api.create(PROPS_VAR_NAMES.createDto)}`,
            hasEmptyLineAtEnd: false,
        });
        this.appendBodyElement({
            name: 'SendActionSystemLogService',
            value: `await ${this.gmServiceSendActionSystemLog.logCreateAction({
                rowId: `${this.getNewDtoPropertyVarName()}.${core_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key}`,
                value: this.getNewDtoPropertyVarName(),
                config: this.gmModuleModel.api.getConfig(),
                initiatorOpenUserId: PROPS_VAR_NAMES.initiatorOpenUserId,
            })}`,
            hasEmptyLineAtEnd: true,
        });
        this.appendBodyElement({
            name: 'returnNewRow',
            value: `return ${this.getNewDtoPropertyVarName()}`,
        });
    }
    getNewDtoPropertyVarName() {
        return 'newDto';
    }
}
exports.GmModuleServiceMethodCreate = GmModuleServiceMethodCreate;
//# sourceMappingURL=GmModuleServiceMethodCreate.js.map