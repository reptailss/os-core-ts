"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmRenderModuleType = void 0;
const core_1 = require("../core");
class GmRenderModuleType extends core_1.GmRenderModule {
    constructor(moduleType) {
        super(moduleType);
        this.moduleType = moduleType;
        this.gmRenderImports = new core_1.GmRenderImports(moduleType);
    }
    renderBody() {
        return this.moduleType.getBody();
    }
    renderImports() {
        return this.gmRenderImports.renderImports();
    }
    getData(key) {
        return this.moduleType.getRenderData(key);
    }
    getExportMarkIfExported() {
        if (this.moduleType.getExport()) {
            return 'export';
        }
        return '';
    }
}
exports.GmRenderModuleType = GmRenderModuleType;
//# sourceMappingURL=GmRenderModuleType.js.map