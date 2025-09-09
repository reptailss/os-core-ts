"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmGenerateCrudDecSql = void 0;
const core_1 = require("../core");
class GmGenerateCrudDecSql extends core_1.GmGenerateAbstractCrudDec {
    constructor(config) {
        const controllers = [];
        if (config.hasSeparated) {
            switch (config.model.type) {
                case 'staticByDbConnection': {
                    controllers.push(new core_1.GmModuleControllerClassCreateBySqlStaticDb(config));
                    controllers.push(new core_1.GmModuleControllerClassUpdateBySqlStaticDb(config));
                    controllers.push(new core_1.GmModuleControllerClassDeleteBySqlStaticDb(config));
                    controllers.push(new core_1.GmModuleControllerClassGetBySqlStaticDb(config));
                    controllers.push(new core_1.GmModuleControllerClassGetAllBySqlStaticDb(config));
                    break;
                }
                case 'dynamicByDomain': {
                    controllers.push(new core_1.GmModuleControllerClassCreateBySqlDynamicDomain(config));
                    controllers.push(new core_1.GmModuleControllerClassUpdateBySqlDynamicDomain(config));
                    controllers.push(new core_1.GmModuleControllerClassDeleteBySqlDynamicDomain(config));
                    controllers.push(new core_1.GmModuleControllerClassGetBySqlDynamicDomain(config));
                    controllers.push(new core_1.GmModuleControllerClassGetAllBySqlDynamicDomain(config));
                    break;
                }
                case 'dynamicDbConfigByLegalEntityId': {
                    controllers.push(new core_1.GmModuleControllerClassCreateBySqlDynamicLeId(config));
                    controllers.push(new core_1.GmModuleControllerClassUpdateBySqlDynamicLeId(config));
                    controllers.push(new core_1.GmModuleControllerClassDeleteBySqlDynamicLeId(config));
                    controllers.push(new core_1.GmModuleControllerClassGetBySqlDynamicLeId(config));
                    controllers.push(new core_1.GmModuleControllerClassGetAllBySqlDynamicLeId(config));
                    break;
                }
            }
        }
        else {
            switch (config.model.type) {
                case 'staticByDbConnection': {
                    controllers.push(new core_1.GmModuleControllerClassCrudBySqlStaticDb(config));
                    break;
                }
                case 'dynamicByDomain': {
                    controllers.push(new core_1.GmModuleControllerClassCrudBySqlDynamicDomain(config));
                    break;
                }
                case 'dynamicDbConfigByLegalEntityId': {
                    controllers.push(new core_1.GmModuleControllerClassCrudBySqlDynamicLeId(config));
                    break;
                }
            }
        }
        super(config, controllers);
    }
}
exports.GmGenerateCrudDecSql = GmGenerateCrudDecSql;
//# sourceMappingURL=GenerateCrudDecSql.js.map