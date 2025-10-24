"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionSql = void 0;
const sequelize_1 = require("sequelize");
const _appError_1 = require("../../../appError");
const core_1 = require("../../core");
const _logger_1 = require("../../../logger");
class DbConnectionSql {
    constructor(dbOptions) {
        this.associationModels = {};
        if ('storage' in dbOptions) {
            this.sequelize = new sequelize_1.Sequelize({
                dialect: dbOptions.dialect,
                logging: false,
                storage: dbOptions === null || dbOptions === void 0 ? void 0 : dbOptions.storage,
            });
            this.cashedKey = 'in-memory';
        }
        else {
            this.sequelize = new sequelize_1.Sequelize(dbOptions.dbDatabase, dbOptions.dbUsername, dbOptions.dbPassword, {
                dialect: dbOptions.dialect,
                host: dbOptions.host,
                port: dbOptions.port,
                timezone: dbOptions.timezone,
                logging: false,
                dialectOptions: {
                    charset: dbOptions.charset,
                },
                storage: dbOptions === null || dbOptions === void 0 ? void 0 : dbOptions.storage,
            });
            this.cashedKey = dbOptions.dbDatabase;
        }
    }
    getQueryInterface() {
        return this.sequelize.getQueryInterface();
    }
    async query(value, options) {
        const res = await this.sequelize.query(value, { replacements: options === null || options === void 0 ? void 0 : options.replacements });
        if (!(res === null || res === void 0 ? void 0 : res.length)) {
            return [];
        }
        return res[0];
    }
    async syncRepositories() {
        this.addAssociations();
        await this.sequelize.sync();
    }
    async close() {
        await this.sequelize.close();
    }
    async tableExists(tableName) {
        return this.getQueryInterface().tableExists(tableName);
    }
    async getColumnsTable(tableName) {
        const columns = await this.getQueryInterface().describeTable(tableName);
        const newColumns = {};
        for (const columnName in columns) {
            const column = columns[columnName];
            newColumns[columnName] = core_1.DbConnectionSqlColumnsHelper.transformDescribeSequelizeColumnToEntity(column);
        }
        return newColumns;
    }
    async renameColumn(tableName, oldName, newName) {
        await this.getQueryInterface().renameColumn(tableName, oldName, newName);
    }
    async addColumn(tableName, columnName, column) {
        await this.getQueryInterface().addColumn(tableName, columnName, core_1.DbConnectionSqlColumnsHelper.entityColumnToSequelizeColumn(column, this.sequelize.getDialect()));
    }
    async removeColumn(tableName, columnName) {
        await this.getQueryInterface().removeColumn(tableName, columnName);
    }
    async changeColumn(tableName, columnName, column) {
        await this.getQueryInterface().changeColumn(tableName, columnName, core_1.DbConnectionSqlColumnsHelper.entityColumnToSequelizeColumn(column, this.sequelize.getDialect()));
    }
    async checkConnection() {
        try {
            await this.sequelize.authenticate();
        }
        catch (error) {
            _logger_1.appLogger.error('os-core: Error connection sql', error);
            throw new _appError_1.AppError('os-core: Error connection sql', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    async dropTable(tableName) {
        const queryInterface = this.getQueryInterface();
        await queryInterface.dropTable(tableName);
    }
    async createTable(tableName, columns) {
        await this.getQueryInterface().createTable(tableName, core_1.DbConnectionSqlColumnsHelper.transformEntityColumnsToSequelize(columns, this.sequelize.getDialect()));
    }
    addModelForAssociation(tableName, associationModel) {
        this.associationModels[tableName] = associationModel;
        return this;
    }
    addAssociations() {
        for (const tableName in this.associationModels) {
            const repository = this.associationModels[tableName];
            const includes = repository.getIncludes();
            if (!includes) {
                continue;
            }
            for (const key in includes) {
                const associationIncludeSql = repository.getIncludes()[key];
                const referenceModel = this.associationModels[associationIncludeSql.tableName];
                if (!referenceModel) {
                    continue;
                }
                switch (associationIncludeSql.type) {
                    case 'hasOne': {
                        repository.hasOne(referenceModel, {
                            foreignKey: associationIncludeSql.referenceColumnKey,
                            as: key,
                            onDelete: associationIncludeSql.onDelete || 'RESTRICT',
                        });
                        break;
                    }
                    case 'hasMany': {
                        repository.hasMany(referenceModel, {
                            foreignKey: associationIncludeSql.referenceColumnKey,
                            as: key,
                            onDelete: associationIncludeSql.onDelete || 'RESTRICT',
                        });
                        break;
                    }
                    case 'belongsTo': {
                        repository.belongsTo(referenceModel, {
                            foreignKey: associationIncludeSql.referenceColumnKey,
                            as: key,
                        });
                        break;
                    }
                }
            }
        }
    }
}
exports.DbConnectionSql = DbConnectionSql;
//# sourceMappingURL=DbConnectionSql.js.map