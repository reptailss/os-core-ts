"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmRenderModuleConstant = void 0;
const core_1 = require("../core");
class GmRenderModuleConstant extends core_1.GmRenderModule {
    constructor(moduleConstant) {
        super(moduleConstant);
        this.moduleConstant = moduleConstant;
        this.gmRenderImports = new core_1.GmRenderImports(moduleConstant);
    }
    renderImports() {
        return this.gmRenderImports.renderImports();
    }
    renderBody() {
        return this.moduleConstant.getBody();
    }
    renderType() {
        if (!this.moduleConstant.getType()) {
            return '';
        }
        return `:${this.moduleConstant.getType()}`;
    }
    getData(key) {
        return this.moduleConstant.getRenderData(key);
    }
    getExportMarkIfExported() {
        if (this.moduleConstant.getExport()) {
            return 'export';
        }
        return '';
    }
}
exports.GmRenderModuleConstant = GmRenderModuleConstant;
//# sourceMappingURL=GmRenderModuleConstant.js.map