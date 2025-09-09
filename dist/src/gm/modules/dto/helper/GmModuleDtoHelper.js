"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleDtoHelper = void 0;
class GmModuleDtoHelper {
}
exports.GmModuleDtoHelper = GmModuleDtoHelper;
GmModuleDtoHelper.getDtoPrimaryKeyByConfig = (config) => {
    switch (config.model.dbType) {
        case 'noSql': {
            return {
                key: '_id',
                type: 'string',
                columnType: 'STRING',
            };
        }
        case 'sql': {
            return {
                key: 'id',
                type: 'number',
                columnType: 'INTEGER',
            };
        }
    }
};
GmModuleDtoHelper.getTypeByColumn = (type) => {
    switch (type) {
        case 'INTEGER':
            return 'number';
        case 'BIGINT':
            return 'number';
        case 'FLOAT':
            return 'number';
        case 'BOOLEAN':
            return 'boolean';
        case 'STRING':
            return 'string';
        case 'TEXT':
            return 'string';
        case 'JSON':
            return 'object';
        case 'OBJECT':
            return 'object';
        case 'DATETIME':
            return 'Date';
        case 'FILE':
            return 'string';
        case 'OPEN_USER_ID':
            return 'number';
        default:
            return 'string';
    }
};
//# sourceMappingURL=GmModuleDtoHelper.js.map