"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSqlRepository = void 0;
const core_1 = require("../../../db/core");
const _logger_1 = require("../../../logger");
const _appError_1 = require("../../../appError");
class NoSqlRepository {
    constructor(dbConnection, collectionName, classEntity, indexes) {
        this.dbConnectionNoSqlFiltersBuilder = new core_1.DbConnectionNoSqlQueryBuilder();
        this.dbConnection = dbConnection.mongoose;
        this.collectionName = collectionName;
        this.databaseName = dbConnection.databaseName;
        const entity = classEntity;
        const mongooseColumns = core_1.DbConnectionModelNoSqlColumnsHelper.transformBaseColumnToMongoose(entity._columns, {
            primaryKey: entity._primaryKey,
            dateAdd: entity._dateAdd,
            dateUpdate: entity._dateUpdate,
        });
        this.model = dbConnection.mongoose.model(collectionName, mongooseColumns, collectionName);
        if (indexes && (indexes === null || indexes === void 0 ? void 0 : indexes.length) >= 1) {
            this.indexes = indexes;
        }
        this.dbConnectionNoSqIndexes = new core_1.DbConnectionNoSqIndexes(classEntity);
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
    async create(createEntity) {
        try {
            const created = new this.model(createEntity);
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
    async createMany(createEntities) {
        var _a;
        try {
            const result = await this.model.insertMany(createEntities);
            return (_a = Object.keys(result)) === null || _a === void 0 ? void 0 : _a.length;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error create rows mongoose', error);
            throw new _appError_1.AppError('os-core:Error create rows mongoose', {
                errorKey: 'CREATE_ROW_ERROR',
            });
        }
    }
    async update(updateEntity, findOptions, hasReturning) {
        var _a;
        let res = null;
        try {
            res = await ((_a = this.model) === null || _a === void 0 ? void 0 : _a.updateOne(this.dbConnectionNoSqlFiltersBuilder.buildWhere(findOptions === null || findOptions === void 0 ? void 0 : findOptions.where, findOptions === null || findOptions === void 0 ? void 0 : findOptions.clientWhere), updateEntity));
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
        if (!hasReturning) {
            return undefined;
        }
        const newRow = await this.model.findOne(findOptions);
        if (!newRow) {
            throw new _appError_1.AppError('os-core:Error getting row after update mongoose', {
                errorKey: 'UPDATE_ROW_ERROR',
            });
        }
        return newRow;
    }
    ;
    async updateMany(updateEntity, findOptions) {
        var _a;
        try {
            const result = await this.model.updateMany(this.dbConnectionNoSqlFiltersBuilder.buildWhere(findOptions === null || findOptions === void 0 ? void 0 : findOptions.where, findOptions === null || findOptions === void 0 ? void 0 : findOptions.clientWhere), updateEntity);
            return (_a = Object.keys(result)) === null || _a === void 0 ? void 0 : _a.length;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error create rows mongoose', error);
            throw new _appError_1.AppError('os-core:Error create rows mongoose', {
                errorKey: 'CREATE_ROW_ERROR',
            });
        }
    }
    async destroy(findOptions) {
        try {
            const res = await this.model.deleteOne(this.dbConnectionNoSqlFiltersBuilder.buildWhere(findOptions === null || findOptions === void 0 ? void 0 : findOptions.where, findOptions === null || findOptions === void 0 ? void 0 : findOptions.clientWhere));
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
    async destroyMany(findOptions) {
        try {
            const res = await this.model.deleteMany(this.dbConnectionNoSqlFiltersBuilder.buildWhere(findOptions === null || findOptions === void 0 ? void 0 : findOptions.where, findOptions === null || findOptions === void 0 ? void 0 : findOptions.clientWhere));
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
    async count(findOptions) {
        try {
            const res = await this.model.countDocuments(this.dbConnectionNoSqlFiltersBuilder.buildWhere(findOptions === null || findOptions === void 0 ? void 0 : findOptions.where, findOptions === null || findOptions === void 0 ? void 0 : findOptions.clientWhere));
            if (!res) {
                return 0;
            }
            return res;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error get counts mongoose', error);
            throw new _appError_1.AppError('os-core:Error get counts mongoose', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    async findOne(findOptions) {
        try {
            let query = this.model.findOne(this.dbConnectionNoSqlFiltersBuilder.buildWhere(findOptions === null || findOptions === void 0 ? void 0 : findOptions.where, findOptions === null || findOptions === void 0 ? void 0 : findOptions.clientWhere));
            const res = await (query === null || query === void 0 ? void 0 : query.lean());
            if (!res) {
                return null;
            }
            return res;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error get row mongoose', error);
            throw new _appError_1.AppError('os-core:Error get row mongoose', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    ;
    async findByPk(value) {
        try {
            let query = this.model.findById(value);
            const res = await (query === null || query === void 0 ? void 0 : query.lean());
            if (!res) {
                return null;
            }
            return res;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error get row by key mongoose', error);
            throw new _appError_1.AppError('os-core:Error get row by key mongoose', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    ;
    async findAll(findOptions) {
        var _a, _b;
        try {
            let query = (_a = this.model) === null || _a === void 0 ? void 0 : _a.find();
            if ((findOptions === null || findOptions === void 0 ? void 0 : findOptions.clientWhere) || (findOptions === null || findOptions === void 0 ? void 0 : findOptions.where)) {
                query = query.find(this.dbConnectionNoSqlFiltersBuilder.buildWhere(findOptions === null || findOptions === void 0 ? void 0 : findOptions.where, findOptions === null || findOptions === void 0 ? void 0 : findOptions.clientWhere));
            }
            if (findOptions === null || findOptions === void 0 ? void 0 : findOptions.order) {
                query = query.sort(this.dbConnectionNoSqlFiltersBuilder.buildOrders(findOptions.order));
            }
            if (findOptions === null || findOptions === void 0 ? void 0 : findOptions.offset) {
                query = query.skip(findOptions.offset);
            }
            if (findOptions === null || findOptions === void 0 ? void 0 : findOptions.limit) {
                query = query.limit(findOptions.limit);
            }
            if ((findOptions === null || findOptions === void 0 ? void 0 : findOptions.attributes) && ((_b = findOptions === null || findOptions === void 0 ? void 0 : findOptions.attributes) === null || _b === void 0 ? void 0 : _b.length) >= 1) {
                query = query === null || query === void 0 ? void 0 : query.select(findOptions.attributes);
            }
            const res = await (query === null || query === void 0 ? void 0 : query.lean());
            if (!(res === null || res === void 0 ? void 0 : res.length)) {
                return [];
            }
            return res;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error get rows mongoose', error);
            throw new _appError_1.AppError('os-core:Error get rows mongoose', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    ;
    async pagination(params, paginationOptions) {
        if ((params === null || params === void 0 ? void 0 : params.per_page) === 0) {
            try {
                const rows = await this.findAll({
                    clientWhere: params.where,
                    order: params.order,
                    attributes: paginationOptions === null || paginationOptions === void 0 ? void 0 : paginationOptions.attributes,
                    where: paginationOptions === null || paginationOptions === void 0 ? void 0 : paginationOptions.where,
                });
                return {
                    page: 1,
                    all_pages: 1,
                    per_page: rows.length,
                    all_rows: rows.length,
                    rows: (rows || []),
                };
            }
            catch (error) {
                _logger_1.appLogger.error('os-core:Error pagination', error);
                throw new _appError_1.AppError('os-core:Error pagination', {
                    errorKey: 'SERVER_SIDE_ERROR',
                });
            }
        }
        try {
            const countAllRows = await this.count({
                clientWhere: params.where,
                where: paginationOptions === null || paginationOptions === void 0 ? void 0 : paginationOptions.where,
            });
            if (!countAllRows) {
                return {
                    page: 1,
                    all_pages: 1,
                    per_page: 0,
                    all_rows: 0,
                    rows: [],
                };
            }
            const perPage = (params === null || params === void 0 ? void 0 : params.per_page) || 10;
            const page = (params === null || params === void 0 ? void 0 : params.page) || 1;
            const rows = await this.findAll({
                offset: (Number(page) - 1) * Number(perPage),
                limit: perPage,
                clientWhere: params === null || params === void 0 ? void 0 : params.where,
                order: params === null || params === void 0 ? void 0 : params.order,
                where: paginationOptions === null || paginationOptions === void 0 ? void 0 : paginationOptions.where,
                attributes: paginationOptions === null || paginationOptions === void 0 ? void 0 : paginationOptions.attributes,
            });
            return {
                page,
                all_pages: Math.ceil(countAllRows / Number(perPage)),
                per_page: perPage,
                all_rows: countAllRows,
                rows: (rows || []),
            };
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error mongoose pagination', error);
            throw new _appError_1.AppError('os-core:Error mongoose pagination', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    async dropCollection() {
        await this.model.collection.drop();
    }
    getConfig() {
        var _a;
        const optionsDb = core_1.DbConnectionNoSqlHelper.getDbOptions(this.optionsDb);
        return {
            database: this.databaseName || '',
            host: (optionsDb === null || optionsDb === void 0 ? void 0 : optionsDb.host) || '',
            port: ((_a = optionsDb === null || optionsDb === void 0 ? void 0 : optionsDb.port) === null || _a === void 0 ? void 0 : _a.toString()) || '0',
            dbType: 'mongodb',
            tableName: this.collectionName,
        };
    }
}
exports.NoSqlRepository = NoSqlRepository;
//# sourceMappingURL=NoSqlRepository.js.map