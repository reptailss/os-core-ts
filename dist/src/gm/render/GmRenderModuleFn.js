"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmRenderModuleFn = void 0;
const core_1 = require("../core");
class GmRenderModuleFn extends core_1.GmRenderModule {
    constructor(moduleFn) {
        super(moduleFn);
        this.moduleFn = moduleFn;
        this.gmRenderImports = new core_1.GmRenderImports(moduleFn);
    }
    renderImports() {
        return this.gmRenderImports.renderImports();
    }
    renderBody() {
        var _a, _b;
        if (!((_a = this.moduleFn.getBodyElements()) === null || _a === void 0 ? void 0 : _a.length)) {
            return '';
        }
        return (_b = this.moduleFn.getBodyElements().map((elem) => {
            if (elem.hasEmptyLineAtEnd) {
                return `${elem.value}\n`;
            }
            return elem.value;
        })) === null || _b === void 0 ? void 0 : _b.join('\n');
    }
    renderReturnType() {
        if (!this.moduleFn.getReturnType()) {
            return '';
        }
        return `:${this.moduleFn.getReturnType()}`;
    }
    renderType() {
        if (!this.moduleFn.getType()) {
            return '';
        }
        return `:${this.moduleFn.getType()}`;
    }
    getData(key) {
        return this.moduleFn.getRenderData(key);
    }
    renderProps() {
        var _a;
        if (!((_a = this.moduleFn.getProps()) === null || _a === void 0 ? void 0 : _a.length)) {
            return '';
        }
        switch (this.moduleFn.getPropsType()) {
            case 'default':
                return this.renderDefaultPropsType();
            case 'object':
                return this.renderObjectPropsType();
        }
    }
    getExportMarkIfExported() {
        if (this.moduleFn.getExport()) {
            return 'export';
        }
        return '';
    }
    renderAsyncType() {
        if (this.moduleFn.getAsyncType() === 'async') {
            return 'async';
        }
        return '';
    }
    renderDefaultPropsType() {
        var _a;
        return (_a = this.moduleFn.getProps().map((prop) => {
            const varName = prop.optional ? `${prop.varName}?` : prop.varName;
            const type = prop.nullable ? `${prop.type} | null` : prop.type;
            return `${varName}:${type}`;
        })) === null || _a === void 0 ? void 0 : _a.join(',');
    }
    renderObjectPropsType() {
        return `{${this.moduleFn.getProps().map((prop) => prop.varName).join(',')}}:{${this.renderDefaultPropsType()}}`;
    }
}
exports.GmRenderModuleFn = GmRenderModuleFn;
//# sourceMappingURL=GmRenderModuleFn.js.map