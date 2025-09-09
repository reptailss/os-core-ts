"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassByNoSqlMonthAndYear = void 0;
const core_1 = require("../../../../core");
const PROP_NAMES = {
    model: 'model',
    getModelCb: 'getModelCb',
    month: 'month',
    year: 'year',
};
class GmModuleServiceClassByNoSqlMonthAndYear extends core_1.GmModuleAbstractServiceClass {
    constructor(config, className) {
        super(config, className);
        this.model = new core_1.GmModuleModelByNoSqlMonthAndYear(config, {
            modelVarName: PROP_NAMES.model,
            getModelCbVarName: `this.${PROP_NAMES.getModelCb}`,
            monthVarName: PROP_NAMES.month,
            yearVarName: PROP_NAMES.year,
        });
        this.modelType = new core_1.GmModuleModelType(config);
        this.gmServiceDateHelper = new core_1.GmServiceDateHelper();
    }
    getModuleModel() {
        return this.model;
    }
    addAndInitMethod(method, monthVarName, yearVarName) {
        method.prependBodyElement({
            name: 'init model',
            value: this.renderInitModel(),
        });
        method.addProp({
            varName: PROP_NAMES.year,
            callVarName: monthVarName,
            decorator: null,
            type: 'number',
        });
        method.addProp({
            varName: PROP_NAMES.month,
            callVarName: yearVarName,
            decorator: null,
            type: 'number',
        });
        method.setPropsType('object');
        this.addMethod(method);
        return this;
    }
    renderInitModel() {
        return `const ${PROP_NAMES.model} = await ${this.model.getInitModel()}`;
    }
    init() {
        this.addModule(this.model);
        this.addModule(this.modelType);
        this.addConstructorProp({
            varName: PROP_NAMES.getModelCb,
            type: this.modelType.getPropertyName(),
            defaultValue: this.model.getPropertyName(),
            privateReadOnly: true,
        });
    }
}
exports.GmModuleServiceClassByNoSqlMonthAndYear = GmModuleServiceClassByNoSqlMonthAndYear;
//# sourceMappingURL=GmModuleServiceClassByNoSqlMonthAndYear.js.map