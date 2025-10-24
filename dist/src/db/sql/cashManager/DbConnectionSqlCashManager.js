"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionSqlCashManager = void 0;
const connections = {};
class DbConnectionSqlCashManager {
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
exports.DbConnectionSqlCashManager = DbConnectionSqlCashManager;
//# sourceMappingURL=DbConnectionSqlCashManager.js.map