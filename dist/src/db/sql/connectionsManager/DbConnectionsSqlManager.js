"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionsSqlManager = void 0;
const core_1 = require("../../core");
class DbConnectionsSqlManager {
    static async closeAllDbConnectionsSql() {
        const connections = core_1.DbConnectionSqlCashManager.getAllFromCash();
        for (const key in connections) {
            await connections[key].close();
            core_1.DbConnectionSqlCashManager.deleteFromCash(key);
        }
        core_1.DbConnectionSqKeepConnectionAlive.stop();
    }
}
exports.DbConnectionsSqlManager = DbConnectionsSqlManager;
//# sourceMappingURL=DbConnectionsSqlManager.js.map