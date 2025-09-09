"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleAppModule = void 0;
const core_1 = require("../../core");
const _helpers_1 = require("../../../helpers");
class GmModuleAppModule extends core_1.GmAbstractModuleConstant {
    constructor(config, controllers) {
        super(config);
        this.controllers = controllers;
    }
    getPropertyName() {
        return `${_helpers_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}AppModule`;
    }
    getDirName() {
        return '/';
    }
    getFileName() {
        return `${this.getPropertyName()}.ts`;
    }
    init() {
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'AppModule',
            isLibImport: true,
        });
        const controllersName = [];
        if (this.controllers.length) {
            this.controllers.forEach((controller) => {
                const exportProp = controller.getExport();
                if (exportProp) {
                    this.addImport(exportProp);
                }
                controllersName.push(controller.getPropertyName());
            });
        }
        const tag = _helpers_1.StringCaseHelper.toKebabCase(this.getConfig().dtoName.plural);
        this.setBody(`
        new AppModule({
            controllers: [${controllersName.join(',')}],
            swaggerInfo:{
                tag:'${tag.charAt(0).toUpperCase() + tag.slice(1)}'
            }
        })`);
    }
}
exports.GmModuleAppModule = GmModuleAppModule;
//# sourceMappingURL=GmModuleAppModule.js.map