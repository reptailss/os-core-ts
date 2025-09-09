"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmPaginationQueryParamsDec = void 0;
class GmPaginationQueryParamsDec {
    constructor(schemaVarName) {
        this.schemaVarName = schemaVarName;
    }
    getDecoratorName() {
        return 'PaginationQueryParamsDec';
    }
    getProps() {
        return [this.schemaVarName];
    }
    getImport() {
        return {
            propertyName: 'PaginationQueryParamsDec',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmPaginationQueryParamsDec = GmPaginationQueryParamsDec;
//# sourceMappingURL=GmPaginationQueryParamsDec.js.map