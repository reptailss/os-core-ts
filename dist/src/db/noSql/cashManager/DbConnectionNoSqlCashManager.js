"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionNoSqlCashManager = void 0;
const connections = {};
class DbConnectionNoSqlCashManager {
    static saveToCash(key, connection) {
        connections[key] = connection;
    }
    static getFromCash(key) {
        if (key in connections) {
            return connections[key];
        }
        return null;
    }
    static deleteFromCash(key) {
        if (key in connections) {
            delete connections[key];
        }
    }
    static getAllFromCash() {
        return connections;
    }
}
exports.DbConnectionNoSqlCashManager = DbConnectionNoSqlCashManager;
//# sourceMappingURL=DbConnectionNoSqlCashManager.js.map