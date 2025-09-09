"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServicePaginationValues = void 0;
const core_1 = require("../../core");
class GmServicePaginationValues extends core_1.GmAbstractServiceFn {
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'PaginationResult',
            isLibImport: true,
        };
    }
    getServiceName() {
        return 'PaginationResult';
    }
    getPaginationResultType(dtoType) {
        return `PaginationResult<${dtoType}>`;
    }
}
exports.GmServicePaginationValues = GmServicePaginationValues;
//# sourceMappingURL=GmServicePaginationResultType.js.map