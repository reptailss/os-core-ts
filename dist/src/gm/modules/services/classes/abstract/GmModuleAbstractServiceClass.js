"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleAbstractServiceClass = void 0;
const core_1 = require("../../../../core");
class GmModuleAbstractServiceClass extends core_1.GmAbstractModuleClass {
    constructor(config, className) {
        super(config);
        this.className = className;
    }
    getPropertyName() {
        return this.className;
    }
    getDirName() {
        return 'services';
    }
    getFileName() {
        return `${this.getPropertyName()}.ts`;
    }
}
exports.GmModuleAbstractServiceClass = GmModuleAbstractServiceClass;
//# sourceMappingURL=GmModuleAbstractServiceClass.js.map