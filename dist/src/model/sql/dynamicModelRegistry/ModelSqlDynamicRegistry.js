"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelSqlDynamicRegistry = void 0;
class ModelSqlDynamicRegistry {
    constructor() {
        this.models = [];
    }
    addModel(model) {
        this.models.push(model);
    }
    getModels() {
        return this.models;
    }
}
exports.ModelSqlDynamicRegistry = ModelSqlDynamicRegistry;
//# sourceMappingURL=ModelSqlDynamicRegistry.js.map