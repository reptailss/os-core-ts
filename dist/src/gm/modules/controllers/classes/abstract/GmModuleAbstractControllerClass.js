"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleAbstractControllerClass = void 0;
const core_1 = require("../../../../core");
class GmModuleAbstractControllerClass extends core_1.GmAbstractModuleClass {
    constructor(config, className) {
        super(config);
        this.className = className;
    }
    getPropertyName() {
        return this.className;
    }
    getDirName() {
        return 'controllers';
    }
    getFileName() {
        return `${this.getPropertyName()}.ts`;
    }
    init() {
        this.addDecorator(new core_1.GmControllerDec());
    }
}
exports.GmModuleAbstractControllerClass = GmModuleAbstractControllerClass;
//# sourceMappingURL=GmModuleAbstractControllerClass.js.map