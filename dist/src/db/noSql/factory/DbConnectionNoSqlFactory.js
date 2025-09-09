"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionNoSqlFactory = void 0;
const core_1 = require("../../core");
class DbConnectionNoSqlFactory {
    static async getDynamicByDatabaseName({ databaseName, optionsDb, }) {
        const dbConnectionNoSql = new core_1.DbConnectionNoSql(databaseName, optionsDb);
        await dbConnectionNoSql.init();
        return dbConnectionNoSql;
    }
}
exports.DbConnectionNoSqlFactory = DbConnectionNoSqlFactory;
//# sourceMappingURL=DbConnectionNoSqlFactory.js.map