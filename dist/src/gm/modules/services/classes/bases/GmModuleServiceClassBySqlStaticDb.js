"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassBySqlStaticDb = void 0;
const core_1 = require("../../../../core");
const PROP_NAMES = {
    model: 'model',
};
class GmModuleServiceClassBySqlStaticDb extends core_1.GmModuleAbstractServiceClass {
    constructor(config, className) {
        super(config, className);
        this.model = new core_1.GmModuleModelSqlByStaticDb(config, `this.${PROP_NAMES.model}`);
        this.modelType = new core_1.GmModuleModelType(config);
    }
    getModuleModel() {
        return this.model;
    }
    init() {
        this.addModule(this.model);
        this.addModule(this.modelType);
        this.addConstructorProp({
            varName: PROP_NAMES.model,
            type: this.modelType.getPropertyName(),
            defaultValue: this.model.getPropertyName(),
            privateReadOnly: true,
        });
    }
}
exports.GmModuleServiceClassBySqlStaticDb = GmModuleServiceClassBySqlStaticDb;
//# sourceMappingURL=GmModuleServiceClassBySqlStaticDb.js.map