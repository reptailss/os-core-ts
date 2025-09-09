"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionSqlFactory = void 0;
const _appError_1 = require("../../../appError");
const _domain_1 = require("../../../domain");
const core_1 = require("../../core");
const _logger_1 = require("../../../logger");
const connections = {};
class DbConnectionSqlFactory {
    static async getDynamicByDomain(props) {
        const databaseName = await _domain_1.DomainService.getDatabaseNameByDomain(props.domain);
        return this.getDynamicByDatabaseName({
            databaseName,
            optionsDb: props.optionsDb,
        });
    }
    static getDynamicByDatabaseName(props) {
        try {
            if (props.databaseName in connections) {
                return connections[props.databaseName];
            }
            const targetOptionsDb = core_1.DbConnectionSqlHelper.getTargetDynamicDbSqlOptions({
                options: props.optionsDb,
                databaseName: props.databaseName,
            });
            const connection = new core_1.DbConnectionSql(Object.assign(Object.assign({}, targetOptionsDb), { dbDatabase: props.databaseName }));
            core_1.DbConnectionSqlHelper.keepConnectionAlive(connection);
            connections[props.databaseName] = connection;
            return connection;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error connecting to dynamic sequelize database', error);
            throw new _appError_1.AppError('os-core:Error connecting to dynamic sequelize database', {
                errorKey: 'CONNECT_TO_DB_ERROR',
            });
        }
    }
    static getStatic(options) {
        try {
            const db = new core_1.DbConnectionSql(core_1.DbConnectionSqlHelper.getTargetStaticDbSqlOptions(options));
            core_1.DbConnectionSqlHelper.keepConnectionAlive(db);
            return db;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error connecting to dynamic database', error);
            throw new _appError_1.AppError('os-core:Error connecting to dynamic database', {
                errorKey: 'CONNECT_TO_DB_ERROR',
            });
        }
    }
}
exports.DbConnectionSqlFactory = DbConnectionSqlFactory;
//# sourceMappingURL=DbConnectionSqlFactory.js.map