"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleModelByNoSqlMonthAndYear = void 0;
const core_1 = require("../../core");
const _helpers_1 = require("../../../helpers");
const PROP_VAR_NAMES = {
    month: 'month',
    year: 'year',
};
class GmModuleModelByNoSqlMonthAndYear extends core_1.GmAbstractModuleFnModelNoSql {
    constructor(config, { modelVarName, getModelCbVarName, monthVarName, yearVarName, }) {
        super(config);
        this.getModelCbVarName = getModelCbVarName;
        this.monthVarName = monthVarName;
        this.yearVarName = yearVarName;
        this.api = new core_1.GmModuleModeApiNoSql(modelVarName);
    }
    getPropertyName() {
        return `get${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Model`;
    }
    getInitModel() {
        const monthStr = this.monthVarName === PROP_VAR_NAMES.month ? PROP_VAR_NAMES.month : `${PROP_VAR_NAMES.month}:${this.monthVarName}`;
        const yearStr = this.yearVarName === PROP_VAR_NAMES.year ? PROP_VAR_NAMES.year : `${PROP_VAR_NAMES.month}:${this.yearVarName}`;
        return `${this.getModelCbVarName}({${monthStr},${yearStr}})`;
    }
    init() {
        super.init();
        this.setPropsType('object');
        this.setAsyncType('async');
        this.setType(this.getModelTypePropertyName());
        this.addProp({
            varName: PROP_VAR_NAMES.month,
            type: 'number',
        });
        this.addProp({
            varName: PROP_VAR_NAMES.year,
            type: 'number',
        });
        const monthStr = this.monthVarName === PROP_VAR_NAMES.month ? PROP_VAR_NAMES.month : `${PROP_VAR_NAMES.month}:${this.monthVarName}`;
        const yearStr = this.yearVarName === PROP_VAR_NAMES.year ? PROP_VAR_NAMES.year : `${PROP_VAR_NAMES.month}:${this.yearVarName}`;
        this.appendBodyElement({
            name: 'returnModel',
            value: `
            return LoaderModelNoSql.byDatabaseNameAndYearMonth({
                columns:${this.getColumnsPropertyName()},
                collectionName:${this.getCollectionNamePropertyName()},
                databaseName:${this.getDatabaseNamePropertyName()},
                ${monthStr},
                ${yearStr},
            })`,
        });
    }
}
exports.GmModuleModelByNoSqlMonthAndYear = GmModuleModelByNoSqlMonthAndYear;
//# sourceMappingURL=GmModuleModelByNoSqlMonthAndYear.js.map