"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionNoSqlFactory = void 0;
const core_1 = require("../../core");
class DbConnectionNoSqlFactory {
    static getStaticByDatabaseName(databaseName) {
        const dbConnectionFromCash = core_1.DbConnectionNoSqlCashManager.getFromCash(databaseName);
        if (dbConnectionFromCash) {
            return dbConnectionFromCash;
        }
        const connection = new core_1.DbConnectionNoSql(databaseName);
        core_1.DbConnectionNoSqlCashManager.saveToCash(databaseName, connection);
        return connection;
    }
}
exports.DbConnectionNoSqlFactory = DbConnectionNoSqlFactory;
//# sourceMappingURL=DbConnectionNoSqlFactory.js.map