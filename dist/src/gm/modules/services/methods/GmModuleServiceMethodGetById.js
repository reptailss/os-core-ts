"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceMethodGetById = void 0;
const core_1 = require("../../../core");
const _helpers_1 = require("../../../../helpers");
const PROPS_VAR_NAMES = {
    id: 'id',
};
class GmModuleServiceMethodGetById extends core_1.GmAbstractModuleClassMethod {
    constructor(config, gmModuleModel, callVarNames) {
        super(config);
        this.gmModuleDto = new core_1.GmModuleDto(config);
        this.gmModuleModel = gmModuleModel;
        this.callVarNames = callVarNames;
    }
    getPropertyName() {
        return `get${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}ById`;
    }
    init() {
        this.addModule(this.gmModuleDto);
        this.setReturnType(`Promise<${this.gmModuleDto.getPropertyName()} | null>`);
        this.setMethodScope('public');
        this.setAsyncType('async');
        this.addProp({
            varName: PROPS_VAR_NAMES.id,
            callVarName: this.callVarNames.id,
            type: core_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type,
            decorator: null,
        });
        this.initGetRow();
    }
    initGetRow() {
        this.appendBodyElement({
            name: 'getRow',
            value: `return ${this.gmModuleModel.api.findByPk(PROPS_VAR_NAMES.id)}`,
        });
    }
}
exports.GmModuleServiceMethodGetById = GmModuleServiceMethodGetById;
//# sourceMappingURL=GmModuleServiceMethodGetById.js.map