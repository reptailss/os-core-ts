"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceMethodGetPagination = void 0;
const core_1 = require("../../../core");
const _helpers_1 = require("../../../../helpers");
const PROPS_VAR_NAMES = {
    params: 'params',
};
class GmModuleServiceMethodGetPagination extends core_1.GmAbstractModuleClassMethod {
    constructor(config, gmModuleModel, callVarNames) {
        super(config);
        this.gmModuleDto = new core_1.GmModuleDto(config);
        this.gmModuleModel = gmModuleModel;
        this.gmServicePaginationQueryParamsType = new core_1.GmServicePaginationQueryParamsType();
        this.gmServicePaginationValuesType = new core_1.GmServicePaginationValuesType();
        this.callVarNames = callVarNames;
    }
    getPropertyName() {
        return `get${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Pagination`;
    }
    init() {
        this.addModule(this.gmModuleDto);
        this.addService(this.gmServicePaginationQueryParamsType);
        this.addService(this.gmServicePaginationValuesType);
        this.setMethodScope('public');
        this.setAsyncType('async');
        this.addProp({
            varName: PROPS_VAR_NAMES.params,
            callVarName: this.callVarNames.params,
            type: this.gmServicePaginationQueryParamsType.getPaginationQueryParamsType(this.gmModuleDto.getPropertyName()),
            decorator: null,
        });
        this.setReturnType(`Promise<${this.gmServicePaginationValuesType.getPaginationValuesType(this.gmModuleDto.getPropertyName())}>`);
        this.appendBodyElement({
            name: 'returnPagination',
            value: `return ${this.gmModuleModel.api.pagination(PROPS_VAR_NAMES.params)}`,
        });
    }
}
exports.GmModuleServiceMethodGetPagination = GmModuleServiceMethodGetPagination;
//# sourceMappingURL=GmModuleServiceMethodGetPagination.js.map