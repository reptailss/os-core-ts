"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServiceStructureAccess = void 0;
const core_1 = require("../../core");
class GmServiceStructureAccess extends core_1.GmAbstractServiceFn {
    getServiceName() {
        return 'StructureAccessService';
    }
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'StructureAccessService',
            isLibImport: true,
        };
    }
    checkAccess(checkStructureAccessPropsVarName) {
        return `StructureAccessService.checkAccess(${checkStructureAccessPropsVarName})`;
    }
}
exports.GmServiceStructureAccess = GmServiceStructureAccess;
//# sourceMappingURL=GmServiceStructureAccess.js.map