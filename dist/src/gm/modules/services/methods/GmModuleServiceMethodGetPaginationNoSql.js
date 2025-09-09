"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceMethodGetPaginationNoSql = void 0;
const core_1 = require("../../../core");
const _helpers_1 = require("../../../../helpers");
const PROPS_VAR_NAMES = {
    params: 'params',
    dateStart: 'dateStart',
    dateEnd: 'dateEnd',
};
class GmModuleServiceMethodGetPaginationNoSql extends core_1.GmAbstractModuleClassMethod {
    constructor(config, gmModuleModel, callVarNames) {
        super(config);
        this.gmModuleDto = new core_1.GmModuleDto(config);
        this.gmServicePaginationQueryParamsType = new core_1.GmServicePaginationQueryParamsType();
        this.gmServicePaginationValuesType = new core_1.GmServicePaginationValuesType();
        this.gmServicePaginationNoSql = new core_1.GmServicePaginationNoSql();
        this.callVarNames = callVarNames;
    }
    getPropertyName() {
        return `get${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Pagination`;
    }
    init() {
        this.addModule(this.gmModuleDto);
        this.addService(this.gmServicePaginationQueryParamsType);
        this.addService(this.gmServicePaginationValuesType);
        this.addService(this.gmServicePaginationNoSql);
        this.setMethodScope('public');
        this.setAsyncType('async');
        this.addProp({
            varName: PROPS_VAR_NAMES.params,
            callVarName: this.callVarNames.params,
            type: this.gmServicePaginationQueryParamsType.getPaginationQueryParamsType(this.gmModuleDto.getPropertyName()),
            decorator: null,
        });
        this.addProp({
            varName: PROPS_VAR_NAMES.dateStart,
            callVarName: this.callVarNames.dateStart,
            type: 'Date',
            decorator: null,
        });
        this.addProp({
            varName: PROPS_VAR_NAMES.dateEnd,
            callVarName: this.callVarNames.dateEnd,
            type: 'Date',
            decorator: null,
        });
        this.setReturnType(`Promise<${this.gmServicePaginationValuesType.getPaginationValuesType(this.gmModuleDto.getPropertyName())}>`);
        this.appendBodyElement({
            name: 'returnPagination',
            value: `return ${this.gmServicePaginationNoSql.getPagination({
                paramsVarName: PROPS_VAR_NAMES.params,
                dateStartVarName: PROPS_VAR_NAMES.dateStart,
                dateEndVarName: PROPS_VAR_NAMES.dateEnd,
                getModelCbVarName: 'this.getModelCb',
            })}`,
        });
    }
}
exports.GmModuleServiceMethodGetPaginationNoSql = GmModuleServiceMethodGetPaginationNoSql;
//# sourceMappingURL=GmModuleServiceMethodGetPaginationNoSql.js.map