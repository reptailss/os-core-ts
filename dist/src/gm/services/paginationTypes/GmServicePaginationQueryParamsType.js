"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServicePaginationQueryParamsType = void 0;
const core_1 = require("../../core");
class GmServicePaginationQueryParamsType extends core_1.GmAbstractServiceFn {
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'PaginationQueryParams',
            isLibImport: true,
        };
    }
    getServiceName() {
        return 'PaginationQueryParams';
    }
    getPaginationQueryParamsType(dtoType) {
        return `PaginationQueryParams<${dtoType}>`;
    }
}
exports.GmServicePaginationQueryParamsType = GmServicePaginationQueryParamsType;
//# sourceMappingURL=GmServicePaginationQueryParamsType.js.map