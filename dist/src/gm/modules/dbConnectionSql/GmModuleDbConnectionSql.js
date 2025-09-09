"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleDbConnectionSql = void 0;
const core_1 = require("../../core");
class GmModuleDbConnectionSql extends core_1.GmAbstractModuleConstant {
    getPropertyName() {
        return 'dbConnectionStaticSql';
    }
    getDirName() {
        return 'db';
    }
    getFileName() {
        return 'dbConnection.ts';
    }
    init() {
        this.setBody('DbConnectionSqlFactory.getStatic()');
        this.setFileWriteMode('skipIfExists');
        this.setDirType('root');
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'DbConnectionSqlFactory',
            isLibImport: true,
            dirType: 'modules',
        });
    }
}
exports.GmModuleDbConnectionSql = GmModuleDbConnectionSql;
//# sourceMappingURL=GmModuleDbConnectionSql.js.map