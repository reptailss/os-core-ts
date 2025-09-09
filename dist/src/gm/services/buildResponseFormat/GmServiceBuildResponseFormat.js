"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServiceBuildResponseFormat = void 0;
const core_1 = require("../../core");
class GmServiceBuildResponseFormat extends core_1.GmAbstractServiceFn {
    getServiceName() {
        return 'BuildResponseFormat';
    }
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'BuildResponseFormat',
            isLibImport: true,
        };
    }
    mutateRow(idVarName) {
        return `BuildResponseFormat.mutateRow(${idVarName})`;
    }
    row(rowVarName) {
        return `BuildResponseFormat.row(${rowVarName})`;
    }
    pagination(paginationVarName) {
        return `BuildResponseFormat.pagination(${paginationVarName})`;
    }
}
exports.GmServiceBuildResponseFormat = GmServiceBuildResponseFormat;
//# sourceMappingURL=GmServiceBuildResponseFormat.js.map