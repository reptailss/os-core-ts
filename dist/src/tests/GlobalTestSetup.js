"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalTestSetup = void 0;
const _di_1 = require("../di");
const _repository_1 = require("../repository");
const core_1 = require("../db/core");
const _db_1 = require("../db");
class GlobalTestSetup {
    static registerLoaderDbConnectionsSqlConfigInMemory() {
        _di_1.DiContainer.register(core_1.LoaderDbConnectionSqlConfigStatic, {
            useClass: _db_1.LoaderDbConnectionSqlConfigStaticInMemory,
        });
        _di_1.DiContainer.register(core_1.LoaderDbConnectionSqlConfigByLeId, {
            useClass: _db_1.LoaderDbConnectionSqlConfigByLeIdInMemory,
        });
        _di_1.DiContainer.register(core_1.LoaderDbConnectionSqlConfigByDomain, {
            useClass: _db_1.LoaderDbConnectionSqlConfigByByDomainInMemory,
        });
    }
    static registerLoaderSqlRepositoryInMemory() {
        _di_1.DiContainer.register(_repository_1.LoaderSqlRepository, {
            useClass: _repository_1.LoaderSqlRepositoryInMemory,
        });
    }
}
exports.GlobalTestSetup = GlobalTestSetup;
//# sourceMappingURL=GlobalTestSetup.js.map