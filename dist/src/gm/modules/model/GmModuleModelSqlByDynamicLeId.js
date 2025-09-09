"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleModelSqlByDynamicLeId = void 0;
const _helpers_1 = require("../../../helpers");
const core_1 = require("../../core");
const PROP_VAR_NAMES = {
    legalEntityId: 'legalEntityId',
};
class GmModuleModelSqlByDynamicLeId extends core_1.GmAbstractModuleFnModelSql {
    constructor(config, { modelVarName, getModelCbVarName, leIdVarName, }) {
        super(config);
        this.getModelCbVarName = getModelCbVarName;
        this.leIdVarName = leIdVarName;
        this.api = new core_1.GmModuleModeApiSql(modelVarName);
    }
    getPropertyName() {
        return `get${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Model`;
    }
    getInitModel() {
        return `${this.getModelCbVarName}(${this.leIdVarName})`;
    }
    init() {
        super.init();
        this.addProp({
            varName: PROP_VAR_NAMES.legalEntityId,
            type: 'number',
        });
        this.setAsyncType('async');
        this.setType(this.getModelTypePropertyName());
        this.appendBodyElement({
            name: 'returnModel',
            value: `
            return LoaderModelSql.dynamicDbConfigByLegalEntityId({
                columns:${this.getColumnsPropertyName()},
                tableName:${this.getTableNamePropertyName()},
                ${PROP_VAR_NAMES.legalEntityId},
            })`,
        });
    }
}
exports.GmModuleModelSqlByDynamicLeId = GmModuleModelSqlByDynamicLeId;
//# sourceMappingURL=GmModuleModelSqlByDynamicLeId.js.map