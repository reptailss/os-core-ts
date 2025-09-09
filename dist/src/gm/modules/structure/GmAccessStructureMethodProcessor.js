"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmAccessStructureMethodProcessor = void 0;
const core_1 = require("../../core");
class GmAccessStructureMethodProcessor {
    constructor(config, varNames) {
        this.config = config;
        this.varNames = varNames;
        this.gmServiceStructureAccess = new core_1.GmServiceStructureAccess();
    }
    add(method) {
        const gmModuleGetStructureProps = new core_1.GmModuleGetStructureProps(this.config, this.varNames);
        method.prependDecorator(new core_1.GmImportStructureServiceEndpointDec(`Add new ${this.config.dtoName.singular.toLowerCase()}`));
        method.addModule(gmModuleGetStructureProps);
        method.addService(this.gmServiceStructureAccess);
        method.prependBodyElement({
            name: 'check Access',
            value: `await ${this.gmServiceStructureAccess.checkAccess(gmModuleGetStructureProps.api.add())}`,
        });
    }
    update(method) {
        const gmModuleGetStructureProps = new core_1.GmModuleGetStructureProps(this.config, this.varNames);
        method.prependDecorator(new core_1.GmImportStructureServiceEndpointDec(`Update ${this.config.dtoName.singular.toLowerCase()}`));
        method.addModule(gmModuleGetStructureProps);
        method.addService(this.gmServiceStructureAccess);
        method.prependBodyElement({
            name: 'check Access',
            value: `await ${this.gmServiceStructureAccess.checkAccess(gmModuleGetStructureProps.api.update())}`,
        });
    }
    delete(method) {
        const gmModuleGetStructureProps = new core_1.GmModuleGetStructureProps(this.config, this.varNames);
        method.prependDecorator(new core_1.GmImportStructureServiceEndpointDec(`Delete ${this.config.dtoName.singular.toLowerCase()}`));
        method.addModule(gmModuleGetStructureProps);
        method.addService(this.gmServiceStructureAccess);
        method.prependBodyElement({
            name: 'check Access',
            value: `await ${this.gmServiceStructureAccess.checkAccess(gmModuleGetStructureProps.api.delete())}`,
        });
    }
    get(method) {
        const gmModuleGetStructureProps = new core_1.GmModuleGetStructureProps(this.config, this.varNames);
        method.prependDecorator(new core_1.GmImportStructureServiceEndpointDec(`Get ${this.config.dtoName.singular.toLowerCase()}`));
        method.addModule(gmModuleGetStructureProps);
        method.addService(this.gmServiceStructureAccess);
        method.prependBodyElement({
            name: 'check Access',
            value: `await ${this.gmServiceStructureAccess.checkAccess(gmModuleGetStructureProps.api.get())}`,
        });
    }
    list(method) {
        const gmModuleGetStructureProps = new core_1.GmModuleGetStructureProps(this.config, this.varNames);
        method.prependDecorator(new core_1.GmImportStructureServiceEndpointDec(`Get list ${this.config.dtoName.plural.toLowerCase()}`));
        method.addModule(gmModuleGetStructureProps);
        method.addService(this.gmServiceStructureAccess);
        method.prependBodyElement({
            name: 'check Access',
            value: `await ${this.gmServiceStructureAccess.checkAccess(gmModuleGetStructureProps.api.list())}`,
        });
    }
}
exports.GmAccessStructureMethodProcessor = GmAccessStructureMethodProcessor;
//# sourceMappingURL=GmAccessStructureMethodProcessor.js.map