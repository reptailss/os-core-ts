"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelNoSql = void 0;
const core_1 = require("../../core");
const _logger_1 = require("../../../logger");
const _appError_1 = require("../../../appError");
class ModelNoSql {
    constructor({ dbConnection, columns, collectionName, options, optionsDb, databaseName, indexes, }) {
        this.dbConnectionNoSqlFiltersBuilder = new core_1.DbConnectionNoSqlFiltersBuilder();
        this.dbConnectionNoSqIndexes = new core_1.DbConnectionNoSqIndexes();
        this.dbConnection = dbConnection;
        this.collectionName = collectionName;
        this.databaseName = databaseName;
        if (optionsDb) {
            this.optionsDb = optionsDb;
        }
        const mongooseColumns = core_1.DbConnectionModelNoSqlColumnsHelper.transformBaseColumnToMongoose({
            columns,
            options,
        });
        this.model = dbConnection.model(collectionName, mongooseColumns, collectionName);
        if (indexes && (indexes === null || indexes === void 0 ? void 0 : indexes.length) >= 1) {
            this.indexes = indexes;
        }
    }
    async syncIndexes() {
        var _a;
        if (!((_a = this.indexes) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        try {
            await this.dbConnectionNoSqIndexes.initIndexesMongoose({
                indexes: this.indexes,
                model: this.model,
                dbConnection: this.dbConnection,
                collectionName: this.collectionName,
            });
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error init indexes mongo db', error);
        }
    }
    async create(row) {
        try {
            const created = new this.model(row);
            await (created === null || created === void 0 ? void 0 : created.save());
            return created;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error create row mongoose', error);
            throw new _appError_1.AppError('os-core:Error create row mongoose', {
                errorKey: 'CREATE_ROW_ERROR',
            });
        }
    }
    async createMany(rows) {
        var _a;
        try {
            const result = await this.model.insertMany(rows);
            return (_a = Object.keys(result)) === null || _a === void 0 ? void 0 : _a.length;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error create rows mongoose', error);
            throw new _appError_1.AppError('os-core:Error create rows mongoose', {
                errorKey: 'CREATE_ROW_ERROR',
            });
        }
    }
    async update(row, options) {
        var _a;
        if (options === null || options === void 0 ? void 0 : options.hasCheckExistence) {
            const found = await this.findOne({
                where: options === null || options === void 0 ? void 0 : options.where,
                filters: options === null || options === void 0 ? void 0 : options.filters,
            });
            if (!found) {
                throw new _appError_1.AppError('Not found', {
                    errorKey: 'NOT_FOUND_ERROR',
                });
            }
        }
        let res = null;
        try {
            res = await ((_a = this.model) === null || _a === void 0 ? void 0 : _a.updateOne(this.dbConnectionNoSqlFiltersBuilder.buildFilters({
                where: options === null || options === void 0 ? void 0 : options.where,
                filters: options === null || options === void 0 ? void 0 : options.filters,
            }), row));
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error update row mongoose', error);
            throw new _appError_1.AppError('os-core:Error update row mongoose', {
                errorKey: 'UPDATE_ROW_ERROR',
            });
        }
        if (!res) {
            throw new _appError_1.AppError('os-core:Error update row mongoose', {
                errorKey: 'UPDATE_ROW_ERROR',
            });
        }
        if (!(options === null || options === void 0 ? void 0 : options.returning)) {
            return;
        }
        const newRow = await this.model.findOne(options);
        if (!newRow) {
            throw new _appError_1.AppError('os-core:Error getting row after update mongoose', {
                errorKey: 'UPDATE_ROW_ERROR',
            });
        }
        return newRow;
    }
    ;
    async destroy(props) {
        try {
            const res = await this.model.deleteOne(this.dbConnectionNoSqlFiltersBuilder.buildFilters({
                where: props === null || props === void 0 ? void 0 : props.where,
                filters: props === null || props === void 0 ? void 0 : props.filters,
            }));
            if (!(res === null || res === void 0 ? void 0 : res.deletedCount)) {
                throw new _appError_1.AppError('os-core:Error delete row mongoose', {
                    errorKey: 'DELETE_ROW_ERROR',
                });
            }
            return res.deletedCount;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error delete row mongoose', error);
            throw new _appError_1.AppError('os-core:Error delete row mongoose', {
                errorKey: 'DELETE_ROW_ERROR',
            });
        }
    }
    ;
    async destroyMany(props) {
        try {
            const res = await this.model.deleteMany(this.dbConnectionNoSqlFiltersBuilder.buildFilters({
                where: props === null || props === void 0 ? void 0 : props.where,
                filters: props === null || props === void 0 ? void 0 : props.filters,
            }));
            if (!(res === null || res === void 0 ? void 0 : res.deletedCount)) {
                throw new _appError_1.AppError('os-core:Error delete row mongoose', {
                    errorKey: 'DELETE_ROW_ERROR',
                });
            }
            return res.deletedCount;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error delete row mongoose', error);
            throw new _appError_1.AppError('os-core:Error delete row mongoose', {
                errorKey: 'DELETE_ROW_ERROR',
            });
        }
    }
    ;
    async findAll(option) {
        var _a, _b;
        try {
            let query = (_a = this.model) === null || _a === void 0 ? void 0 : _a.find();
            if ((option === null || option === void 0 ? void 0 : option.where) || (option === null || option === void 0 ? void 0 : option.filters)) {
                query = query.find(this.dbConnectionNoSqlFiltersBuilder.buildFilters({
                    where: option === null || option === void 0 ? void 0 : option.where,
                    filters: option === null || option === void 0 ? void 0 : option.filters,
                }));
            }
            if (option === null || option === void 0 ? void 0 : option.order) {
                query = query.sort(this.dbConnectionNoSqlFiltersBuilder.buildOrders(option.order));
            }
            if (option === null || option === void 0 ? void 0 : option.offset) {
                query = query.skip(option.offset);
            }
            if (option === null || option === void 0 ? void 0 : option.limit) {
                query = query.limit(option.limit);
            }
            if ((option === null || option === void 0 ? void 0 : option.attributes) && ((_b = option === null || option === void 0 ? void 0 : option.attributes) === null || _b === void 0 ? void 0 : _b.length) >= 1) {
                query = query === null || query === void 0 ? void 0 : query.select(option.attributes);
            }
            const res = await (query === null || query === void 0 ? void 0 : query.lean());
            if (!(res === null || res === void 0 ? void 0 : res.length)) {
                return [];
            }
            return res;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error get rows mongoose', error);
            return [];
        }
    }
    ;
    async count(option) {
        try {
            const res = await this.model.countDocuments(this.dbConnectionNoSqlFiltersBuilder.buildFilters({
                where: option === null || option === void 0 ? void 0 : option.where,
                filters: option === null || option === void 0 ? void 0 : option.filters,
            }));
            if (!res) {
                return 0;
            }
            return res;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error get counts mongoose', error);
            return 0;
        }
    }
    ;
    async findOne(option) {
        var _a;
        try {
            let query = this.model.findOne(this.dbConnectionNoSqlFiltersBuilder.buildFilters({
                where: option === null || option === void 0 ? void 0 : option.where,
                filters: option === null || option === void 0 ? void 0 : option.filters,
            }));
            if ((option === null || option === void 0 ? void 0 : option.attributes) && ((_a = option === null || option === void 0 ? void 0 : option.attributes) === null || _a === void 0 ? void 0 : _a.length) >= 1) {
                query = query === null || query === void 0 ? void 0 : query.select(option.attributes);
            }
            const res = await (query === null || query === void 0 ? void 0 : query.lean());
            if (!res) {
                return null;
            }
            return res;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error get row mongoose', error);
            return null;
        }
    }
    ;
    async findByPk(key, option) {
        var _a;
        try {
            let query = this.model.findById(key);
            if ((option === null || option === void 0 ? void 0 : option.attributes) && ((_a = option === null || option === void 0 ? void 0 : option.attributes) === null || _a === void 0 ? void 0 : _a.length) >= 1) {
                query = query === null || query === void 0 ? void 0 : query.select(option.attributes);
            }
            const res = await (query === null || query === void 0 ? void 0 : query.lean());
            if (!res) {
                return null;
            }
            return res;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error get row by key mongoose', error);
            return null;
        }
    }
    ;
    async dropCollection() {
        await this.model.collection.drop();
    }
    getConfig() {
        var _a;
        const optionsDb = core_1.DbConnectionNoSqlHelper.getDbOptions(this.optionsDb);
        return {
            database: (this === null || this === void 0 ? void 0 : this.databaseName) || '',
            host: (optionsDb === null || optionsDb === void 0 ? void 0 : optionsDb.host) || '',
            port: ((_a = optionsDb === null || optionsDb === void 0 ? void 0 : optionsDb.port) === null || _a === void 0 ? void 0 : _a.toString()) || '0',
            dbType: 'mongodb',
            tableName: this.collectionName,
        };
    }
}
exports.ModelNoSql = ModelNoSql;
//# sourceMappingURL=ModelNoSql.js.map