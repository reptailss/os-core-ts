"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServicePaginationQueryParamsValidator = void 0;
class GmServicePaginationQueryParamsValidator {
    constructor() {
        this.serviceType = 'fn';
    }
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'PaginationQueryParamsValidator',
            isLibImport: true,
        };
    }
    getServiceName() {
        return 'PaginationQueryParamsValidator';
    }
    getSchema(dtoSchema) {
        return `PaginationQueryParamsValidator.getSchema(
           ${dtoSchema}
        )`;
    }
}
exports.GmServicePaginationQueryParamsValidator = GmServicePaginationQueryParamsValidator;
//# sourceMappingURL=GmServicePaginationQueryParamsValidator.js.map