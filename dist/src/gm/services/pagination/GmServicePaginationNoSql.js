"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServicePaginationNoSql = void 0;
const core_1 = require("../../core");
class GmServicePaginationNoSql extends core_1.GmAbstractServiceFn {
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'ModelNoSqlPagination',
            isLibImport: true,
        };
    }
    getServiceName() {
        return 'ModelNoSqlPagination';
    }
    getPagination({ paramsVarName, dateStartVarName, dateEndVarName, getModelCbVarName, }) {
        const paramsStr = paramsVarName === 'params' ? paramsVarName : `params:${paramsVarName}`;
        const dateStartStr = dateStartVarName === 'dateStart' ? dateStartVarName : `dateStart:${dateStartVarName}`;
        const dateEndStr = dateEndVarName === 'dateEnd' ? dateEndVarName : `dateEnd:${dateEndVarName}`;
        const getModelCbStr = getModelCbVarName === 'getModelCb' ? getModelCbVarName : `getModelCb:${getModelCbVarName}`;
        return `ModelNoSqlPagination.byYearAndMoth({
            ${paramsStr},
            ${dateStartStr},
            ${dateEndStr},
            ${getModelCbStr}
        })
        `;
    }
}
exports.GmServicePaginationNoSql = GmServicePaginationNoSql;
//# sourceMappingURL=GmServicePaginationNoSql.js.map