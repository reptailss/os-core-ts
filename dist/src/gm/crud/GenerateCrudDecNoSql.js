"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmGenerateCrudDecNoSql = void 0;
const core_1 = require("../core");
class GmGenerateCrudDecNoSql extends core_1.GmGenerateAbstractCrudDec {
    constructor(config) {
        const controllers = [];
        if (config.hasSeparated) {
            switch (config.model.type) {
                case 'byDatabaseNameAndYearMonth': {
                    controllers.push(new core_1.GmModuleControllerClassCreateByNoSqlMonthAndYear(config));
                    controllers.push(new core_1.GmModuleControllerClassGetAllByNoSqlMonthAndYear(config));
                    break;
                }
            }
        }
        else {
            switch (config.model.type) {
                case 'byDatabaseNameAndYearMonth': {
                    controllers.push(new core_1.GmModuleControllerClassCrudByNoSqlMonthAndYear(config));
                    break;
                }
            }
        }
        super(config, controllers);
    }
}
exports.GmGenerateCrudDecNoSql = GmGenerateCrudDecNoSql;
//# sourceMappingURL=GenerateCrudDecNoSql.js.map