"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmImportStructureServiceEndpointDec = void 0;
class GmImportStructureServiceEndpointDec {
    constructor(name) {
        this.name = name;
    }
    getDecoratorName() {
        return 'ImportStructureServiceEndpointDec';
    }
    getProps() {
        return [`'${this.name}'`];
    }
    getImport() {
        return {
            propertyName: 'ImportStructureServiceEndpointDec',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmImportStructureServiceEndpointDec = GmImportStructureServiceEndpointDec;
//# sourceMappingURL=GmImportStructureServiceEndpointDec.js.map