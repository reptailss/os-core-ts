"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoaderModelSql = void 0;
const _db_1 = require("../../../db");
const _domain_1 = require("../../../domain");
const _appError_1 = require("../../../appError");
const _services_1 = require("../../../services");
const _logger_1 = require("../../../logger");
const models = {};
class LoaderModelSql {
    static async dynamicByDatabaseName(props) {
        const key = `${props.databaseName}_${props.tableName}`;
        if (key in models) {
            return models[key];
        }
        const dbConnection = _db_1.DbConnectionSqlFactory.getDynamicByDatabaseName({
            databaseName: props.databaseName,
            optionsDb: props.optionsDb,
        });
        try {
            const model = dbConnection.defineModel(props.tableName, props.columns, props.options, {}, props.indexes);
            await model.syncModel();
            if (props.migrationTaskFactory) {
                await new props.migrationTaskFactory(new _db_1.SqlMigrations(dbConnection, props.tableName), dbConnection).runMigrations();
            }
            if (props.dynamicModelRegistry) {
                props.dynamicModelRegistry.addModel(model);
            }
            models[key] = model;
            return model;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error get dynamic api sequelize', error);
            throw new _appError_1.AppError('os-core:Error get dynamic api sequelize', {
                errorKey: 'GET_MODEL_ERROR',
            });
        }
    }
    static async dynamicByDomain(props) {
        const databaseName = await _domain_1.DomainService.getDatabaseNameByDomain(props.domain);
        const model = await this.dynamicByDatabaseName({
            databaseName,
            tableName: props.tableName,
            options: props.options,
            columns: props.columns,
            optionsDb: props.columns,
            migrationTaskFactory: props.migrationTaskFactory,
            dynamicModelRegistry: props.dynamicModelRegistry,
            indexes: props.indexes,
        });
        model.saveExtraData('domain', props.domain);
        return model;
    }
    static async dynamicDbConfigByLegalEntityId(props) {
        const { database, password, port, host, username, } = await _services_1.OsCoreLegalEntityService.getDbConfigById(props.legalEntityId);
        const model = await this.dynamicByDatabaseName({
            databaseName: database,
            tableName: props.tableName,
            options: props.options,
            columns: props.columns,
            optionsDb: Object.assign(Object.assign({}, (props.optionsDb || {})), { host,
                port, dbPassword: password, dbUsername: username }),
            migrationTaskFactory: props.migrationTaskFactory,
            dynamicModelRegistry: props.dynamicModelRegistry,
            indexes: props.indexes,
        });
        model.saveExtraData('leId', props.legalEntityId.toString());
        return model;
    }
    static staticByDbConnection(props) {
        try {
            return props.dbConnection.defineModel(props.tableName, props.columns, props.options, props.includes, props.indexes);
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error get static api', error);
            throw new _appError_1.AppError('os-core:Error get static api', {
                errorKey: 'GET_MODEL_ERROR',
            });
        }
    }
}
exports.LoaderModelSql = LoaderModelSql;
//# sourceMappingURL=LoaderModelSql.js.map