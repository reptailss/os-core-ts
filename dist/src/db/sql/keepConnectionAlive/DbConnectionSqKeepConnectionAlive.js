"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionSqKeepConnectionAlive = void 0;
const _logger_1 = require("../../../logger");
const connections = [];
class DbConnectionSqKeepConnectionAlive {
    static keepConnectionAlive(connection) {
        if (!connections.includes(connection)) {
            connections.push(connection);
        }
        if (this.isProcess) {
            return;
        }
        this.intervalId = setInterval(() => {
            void Promise.all(connections.map(async (connection) => {
                try {
                    await connection.query('SELECT 1');
                }
                catch (error) {
                    _logger_1.appLogger.error('os-core: Error keep connection alive Sequelize', error);
                }
            }));
        }, 600000);
        this.isProcess = true;
    }
    static stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.isProcess = false;
            this.intervalId = undefined;
        }
    }
}
exports.DbConnectionSqKeepConnectionAlive = DbConnectionSqKeepConnectionAlive;
DbConnectionSqKeepConnectionAlive.isProcess = false;
//# sourceMappingURL=DbConnectionSqKeepConnectionAlive.js.map