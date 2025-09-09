"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassBySqlDynamicLeId = void 0;
const core_1 = require("../../../../core");
const PROP_NAMES = {
    model: 'model',
    getModelCb: 'getModelCb',
    legalEntityId: 'legalEntityId',
};
class GmModuleServiceClassBySqlDynamicLeId extends core_1.GmModuleAbstractServiceClass {
    constructor(config, serviceName) {
        super(config, serviceName);
        this.model = new core_1.GmModuleModelSqlByDynamicLeId(config, {
            modelVarName: PROP_NAMES.model,
            getModelCbVarName: `this.${PROP_NAMES.getModelCb}`,
            leIdVarName: PROP_NAMES.legalEntityId,
        });
        this.modelType = new core_1.GmModuleModelType(config);
    }
    getModuleModel() {
        return this.model;
    }
    addAndInitMethod(method, leIdVarName) {
        method.prependBodyElement({
            name: 'init model',
            value: `const ${PROP_NAMES.model} = await ${this.model.getInitModel()}`,
        });
        method.addProp({
            varName: PROP_NAMES.legalEntityId,
            decorator: null,
            type: 'number',
            callVarName: leIdVarName,
        });
        method.setPropsType('object');
        this.addMethod(method);
        return this;
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
exports.GmModuleServiceClassBySqlDynamicLeId = GmModuleServiceClassBySqlDynamicLeId;
//# sourceMappingURL=GmModuleServiceClassBySqlDynamicLeId.js.map