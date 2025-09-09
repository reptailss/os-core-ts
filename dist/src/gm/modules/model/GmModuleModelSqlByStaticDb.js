"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleModelSqlByStaticDb = void 0;
const core_1 = require("../../core");
const _helpers_1 = require("../../../helpers");
class GmModuleModelSqlByStaticDb extends core_1.GmAbstractModuleConstantModelSql {
    constructor(config, modelVarName) {
        super(config);
        this.gmModuleDbConnectionSql = new core_1.GmModuleDbConnectionSql(config);
        this.api = new core_1.GmModuleModeApiSql(modelVarName);
    }
    getPropertyName() {
        return `${_helpers_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Model`;
    }
    init() {
        super.init();
        this.addModule(this.gmModuleDbConnectionSql);
        this.setType(this.getModelTypePropertyName());
        this.setBody(`LoaderModelSql.staticByDbConnection({
                 columns:${this.getColumnsPropertyName()},
                 tableName:${this.getTableNamePropertyName()},
                dbConnection:${this.gmModuleDbConnectionSql.getPropertyName()},
            })`);
    }
}
exports.GmModuleModelSqlByStaticDb = GmModuleModelSqlByStaticDb;
//# sourceMappingURL=GmModuleModelSqlByStaticDb.js.map