"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmAbstractModule = void 0;
const _helpers_1 = require("../../../helpers");
class GmAbstractModule {
    constructor(config) {
        this.childModules = [];
        this.modules = [];
        this.importsModules = [];
        this.parentInfo = null;
        this.config = config;
    }
    getConfig() {
        return this.config;
    }
    getRootModuleDirName() {
        return _helpers_1.StringCaseHelper.toCamelCase(this.getConfig().moduleName);
    }
    addService(service) {
        this.addImport(service.getExport());
        return this;
    }
    addModule(module, options = { hasAddImport: true }) {
        module.init();
        this.modules.push(module);
        if ((options === null || options === void 0 ? void 0 : options.hasAddImport) !== false) {
            const exportProperty = module.getExport();
            if (exportProperty) {
                this.addImport(exportProperty, module.getDirType());
            }
        }
        return this;
    }
    getModules() {
        return this.modules;
    }
    addChildModule(module) {
        module.init();
        this.childModules.push(module);
        const exportProperty = module.getExport();
        if (exportProperty) {
            this.addImport(exportProperty, module.getDirType());
        }
        return this;
    }
    getChildModules() {
        return this.childModules;
    }
    addImport(data, dirType) {
        this.importsModules.push({
            dirType: data.dirType || dirType,
            propertyName: data.propertyName,
            isLibImport: data.isLibImport,
            path: data.path,
        });
        return this;
    }
    getImports() {
        return this.importsModules;
    }
    setParentInfo(info) {
        this.parentInfo = info;
        return this;
    }
    getParentInfo() {
        return this.parentInfo;
    }
}
exports.GmAbstractModule = GmAbstractModule;
//# sourceMappingURL=GmAbstractModule.js.map