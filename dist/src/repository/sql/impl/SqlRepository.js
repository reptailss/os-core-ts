"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlRepository = void 0;
const core_1 = require("../../../db/core");
const _logger_1 = require("../../../logger");
const _appError_1 = require("../../../appError");
class SqlRepository {
    constructor(dbConnection, tableName, classEntity, indexes, includes) {
        this.tableName = tableName;
        this.extraData = {};
        const entity = classEntity;
        const sequelize = dbConnection.sequelize;
        this.dbConnection = sequelize;
        this.model = sequelize.define(tableName, core_1.DbConnectionSqlColumnsHelper.transformEntityColumnsToSequelize(entity._columns, sequelize.getDialect(), {
            primaryKey: entity._primaryKey,
            dateAdd: entity._dateAdd,
            dateUpdate: entity._dateUpdate,
        }), {
            freezeTableName: true,
            timestamps: true,
            createdAt: entity._dateAdd === null ? false : entity._dateAdd,
            updatedAt: entity._dateUpdate === null ? false : entity._dateUpdate,
            indexes: core_1.DbConnectionSqlColumnsHelper.transformIndexesToSequelize(indexes),
        });
        this.dbConnectionSqlQueryBuilder = new core_1.DbConnectionSqlQueryBuilder(sequelize, includes);
        this._includes = includes || {};
    }
    async create(createEntity) {
        try {
            return await this.createRow(createEntity);
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error create row sequelize', error);
            throw new _appError_1.AppError('os-core:Error create row sequelize', {
                errorKey: 'CREATE_ROW_ERROR',
            });
        }
    }
    async createMany(createEntities) {
        try {
            const res = await this.model.bulkCreate(createEntities, {
                validate: true,
                returning: false,
            });
            return res.length;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error bulk create sequelize', error);
            throw new _appError_1.AppError('os-core:Error bulk create sequelize', {
                errorKey: 'CREATE_ROW_ERROR',
            });
        }
    }
    async createRow(createEntity) {
        const created = await this.model.create(createEntity);
        await created.reload();
        return created.get({ plain: true });
    }
    async update(updateEntity, findOptions, hasReturning) {
        let res = null;
        try {
            res = await this.model.update(updateEntity, {
                where: this.dbConnectionSqlQueryBuilder.buildWhere(findOptions === null || findOptions === void 0 ? void 0 : findOptions.where, findOptions === null || findOptions === void 0 ? void 0 : findOptions.clientWhere),
                limit: 1,
            });
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error update row sequelize', error);
            throw new _appError_1.AppError('os-core:Error update row sequelize', {
                errorKey: 'UPDATE_ROW_ERROR',
            });
        }
        if (!res) {
            throw new _appError_1.AppError('os-core:Error update row sequelize', {
                errorKey: 'UPDATE_ROW_ERROR',
            });
        }
        if (!hasReturning) {
            return undefined;
        }
        const newRow = await this.findOne({
            clientWhere: findOptions === null || findOptions === void 0 ? void 0 : findOptions.clientWhere,
            where: findOptions === null || findOptions === void 0 ? void 0 : findOptions.where,
        });
        if (!newRow) {
            throw new _appError_1.AppError('os-core:Error getting row after update sequelize', {
                errorKey: 'UPDATE_ROW_ERROR',
            });
        }
        return newRow;
    }
    async updateMany(updateEntity, findOptions) {
        try {
            const res = await this.model.update(updateEntity, {
                where: this.dbConnectionSqlQueryBuilder.buildWhere(findOptions === null || findOptions === void 0 ? void 0 : findOptions.where, findOptions === null || findOptions === void 0 ? void 0 : findOptions.clientWhere),
            });
            return res[0];
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error update row sequelize', error);
            throw new _appError_1.AppError('os-core:Error update row sequelize', {
                errorKey: 'UPDATE_ROW_ERROR',
            });
        }
    }
    async destroy(findOptions) {
        try {
            return await this.model.destroy({
                where: this.dbConnectionSqlQueryBuilder.buildWhere(findOptions.where, findOptions.clientWhere),
                limit: 1,
            });
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error delete row sequelize', error);
            throw new _appError_1.AppError('os-core:Error delete row sequelize', {
                errorKey: 'DELETE_ROW_ERROR',
            });
        }
    }
    async destroyMany(findOptions) {
        try {
            return await this.model.destroy({
                where: this.dbConnectionSqlQueryBuilder.buildWhere(findOptions.where, findOptions.clientWhere),
            });
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error delete row sequelize', error);
            throw new _appError_1.AppError('os-core:Error delete row sequelize', {
                errorKey: 'DELETE_ROW_ERROR',
            });
        }
    }
    async count(findOptions) {
        try {
            const raw = this.dbConnectionSqlQueryBuilder.getRawOption(findOptions === null || findOptions === void 0 ? void 0 : findOptions.include);
            const res = await this.model.count({
                where: this.dbConnectionSqlQueryBuilder.buildWhere(findOptions === null || findOptions === void 0 ? void 0 : findOptions.where, findOptions === null || findOptions === void 0 ? void 0 : findOptions.clientWhere),
                raw,
                include: this.dbConnectionSqlQueryBuilder.getIncludes(findOptions === null || findOptions === void 0 ? void 0 : findOptions.include),
            });
            if (!res) {
                return 0;
            }
            if (Array.isArray(res)) {
                return res.length;
            }
            return res;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error get counts sequelize', error);
            throw new _appError_1.AppError('os-core:Error get counts sequelize', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    async findOne(findOptions) {
        try {
            const res = await this.model.findOne({
                where: this.dbConnectionSqlQueryBuilder.buildWhere(findOptions === null || findOptions === void 0 ? void 0 : findOptions.where, findOptions === null || findOptions === void 0 ? void 0 : findOptions.clientWhere),
                raw: true,
            });
            if (!res) {
                return null;
            }
            return res;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error get row sequelize', error);
            throw new _appError_1.AppError('os-core:Error get row sequelize', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    async findByPk(value) {
        try {
            const res = await this.model.findByPk(value, {
                raw: true,
            });
            if (!res) {
                return null;
            }
            return res;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error get row sequelize', error);
            throw new _appError_1.AppError('os-core:Error get row sequelize', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    async findAll(findOptions) {
        try {
            const raw = this.dbConnectionSqlQueryBuilder.getRawOption(findOptions === null || findOptions === void 0 ? void 0 : findOptions.include);
            const res = await this.model.findAll({
                where: this.dbConnectionSqlQueryBuilder.buildWhere(findOptions === null || findOptions === void 0 ? void 0 : findOptions.where, findOptions === null || findOptions === void 0 ? void 0 : findOptions.clientWhere),
                order: this.dbConnectionSqlQueryBuilder.buildOrder(findOptions === null || findOptions === void 0 ? void 0 : findOptions.order),
                limit: findOptions === null || findOptions === void 0 ? void 0 : findOptions.limit,
                offset: findOptions === null || findOptions === void 0 ? void 0 : findOptions.offset,
                raw,
                attributes: this.dbConnectionSqlQueryBuilder.buildAttributes(findOptions === null || findOptions === void 0 ? void 0 : findOptions.attributes, findOptions === null || findOptions === void 0 ? void 0 : findOptions.aggregates),
                include: this.dbConnectionSqlQueryBuilder.getIncludes(findOptions === null || findOptions === void 0 ? void 0 : findOptions.include),
                nest: true,
                group: findOptions === null || findOptions === void 0 ? void 0 : findOptions.group,
            });
            if (!(res === null || res === void 0 ? void 0 : res.length)) {
                return [];
            }
            return res;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error get rows sequelize', error);
            throw new _appError_1.AppError('os-core:Error get rows sequelize', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    async pagination(params, paginationOptions) {
        if ((params === null || params === void 0 ? void 0 : params.per_page) === 0) {
            try {
                const rows = await this.findAll({
                    clientWhere: params.where,
                    order: params.order,
                    attributes: paginationOptions === null || paginationOptions === void 0 ? void 0 : paginationOptions.attributes,
                    where: paginationOptions === null || paginationOptions === void 0 ? void 0 : paginationOptions.where,
                    include: paginationOptions === null || paginationOptions === void 0 ? void 0 : paginationOptions.include,
                    aggregates: paginationOptions === null || paginationOptions === void 0 ? void 0 : paginationOptions.aggregates,
                    group: paginationOptions === null || paginationOptions === void 0 ? void 0 : paginationOptions.group,
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
                _logger_1.appLogger.error('os-core:Error sequelize pagination', error);
                throw new _appError_1.AppError('os-core:Error sequelize pagination', {
                    errorKey: 'SERVER_SIDE_ERROR',
                });
            }
        }
        try {
            const countAllRows = await this.count({
                clientWhere: params.where,
                where: paginationOptions === null || paginationOptions === void 0 ? void 0 : paginationOptions.where,
                include: paginationOptions === null || paginationOptions === void 0 ? void 0 : paginationOptions.include,
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
                group: paginationOptions === null || paginationOptions === void 0 ? void 0 : paginationOptions.group,
                aggregates: paginationOptions === null || paginationOptions === void 0 ? void 0 : paginationOptions.aggregates,
                include: paginationOptions === null || paginationOptions === void 0 ? void 0 : paginationOptions.include,
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
            _logger_1.appLogger.error('os-core:Error sequelize pagination', error);
            throw new _appError_1.AppError('os-core:Error sequelize pagination', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    async query(value, options) {
        try {
            const res = await this.dbConnection.query(value, options);
            if (!(res === null || res === void 0 ? void 0 : res.length)) {
                return [];
            }
            return res[0];
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error query sequelize', error);
            throw new _appError_1.AppError('os-core:Error query sequelize', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    getConfig() {
        var _a;
        const config = this.dbConnection.config;
        return {
            database: config.database,
            host: config.host || '',
            port: ((_a = config.port) === null || _a === void 0 ? void 0 : _a.toString()) || '0',
            dbType: 'mysql',
            tableName: this.tableName,
        };
    }
    hasOne(model, options) {
        this.model.hasOne(model._getRawModel(), options);
        return this;
    }
    hasMany(model, options) {
        this.model.hasMany(model._getRawModel(), options);
        return this;
    }
    belongsTo(model, options) {
        this.model.belongsTo(model._getRawModel(), options);
        return this;
    }
    getExtraData(key) {
        if (!(key in this.extraData)) {
            return null;
        }
        return this.extraData[key];
    }
    saveExtraData(key, value) {
        this.extraData[key] = value;
        return this;
    }
    async syncRepository() {
        await this.model.sync();
    }
    _getRawModel() {
        return this.model;
    }
    getIncludes() {
        return this._includes;
    }
}
exports.SqlRepository = SqlRepository;
//# sourceMappingURL=SqlRepository.js.map