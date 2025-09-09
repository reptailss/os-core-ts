"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleModelSqlByDynamicDomain = void 0;
const core_1 = require("../../core");
const _helpers_1 = require("../../../helpers");
const PROP_VAR_NAMES = {
    domain: 'domain',
};
class GmModuleModelSqlByDynamicDomain extends core_1.GmAbstractModuleFnModelSql {
    constructor(config, { modelVarName, domainVarName, getModelCbVarName, }) {
        super(config);
        this.getModelCbVarName = getModelCbVarName;
        this.domainVarName = domainVarName;
        this.api = new core_1.GmModuleModeApiSql(modelVarName);
    }
    getPropertyName() {
        return `get${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Model`;
    }
    getInitModel() {
        return `${this.getModelCbVarName}(${this.domainVarName})`;
    }
    init() {
        super.init();
        this.setAsyncType('async');
        this.setType(this.getModelTypePropertyName());
        this.addProp({
            varName: PROP_VAR_NAMES.domain,
            type: 'string',
        });
        this.appendBodyElement({
            name: 'returnModel',
            value: `
            return LoaderModelSql.dynamicByDomain({
                columns:${this.getColumnsPropertyName()},
                tableName:${this.getTableNamePropertyName()},
                ${PROP_VAR_NAMES.domain},
            })`,
        });
    }
}
exports.GmModuleModelSqlByDynamicDomain = GmModuleModelSqlByDynamicDomain;
//# sourceMappingURL=GmModuleModelSqlByDynamicDomain.js.map