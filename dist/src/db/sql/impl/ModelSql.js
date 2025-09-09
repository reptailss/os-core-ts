"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelSql = void 0;
const _appError_1 = require("../../../appError");
const core_1 = require("../../core");
const _logger_1 = require("../../../logger");
class ModelSql {
    constructor(dbConnection, tableName, columns, options, includes, indexes) {
        this.extraData = {};
        this._includes = includes || {};
        this.dbConnectionSqlModelQueryBuilder = new core_1.DbConnectionSqlModelQueryBuilder(dbConnection, includes);
        this.columns = columns;
        if (options) {
            this.settings = options;
        }
        this.model = dbConnection.define(tableName, core_1.DbConnectionModelSqlColumnsHelper.transformBaseColumnToSequelize(columns, options), {
            freezeTableName: true,
            timestamps: true,
            createdAt: typeof (options === null || options === void 0 ? void 0 : options.dateAdd) === 'undefined' ? 'date_update' : (options === null || options === void 0 ? void 0 : options.dateAdd) === null ? false : options === null || options === void 0 ? void 0 : options.dateAdd,
            updatedAt: typeof (options === null || options === void 0 ? void 0 : options.dateUpdate) === 'undefined' ? 'date_update' : (options === null || options === void 0 ? void 0 : options.dateUpdate) === null ? false : options === null || options === void 0 ? void 0 : options.dateUpdate,
            indexes: core_1.DbConnectionModelSqlColumnsHelper.transformIndexesToSequelize(indexes),
        });
        this.dbConnection = dbConnection;
        this.tableName = tableName;
    }
    getIncludes() {
        return this._includes;
    }
    getColumns() {
        return this.columns;
    }
    async create(row) {
        try {
            return await this.createRow(row);
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error create row sequelize', error);
            throw new _appError_1.AppError('os-core:Error create row sequelize', {
                errorKey: 'CREATE_ROW_ERROR',
            });
        }
    }
    ;
    async createRow(row) {
        const created = await this.model.create(row);
        await created.reload();
        return created.get({ plain: true });
    }
    async update(row, options) {
        let res = null;
        try {
            res = await this.model.update(row, {
                where: this.dbConnectionSqlModelQueryBuilder.buildWhere({
                    where: options === null || options === void 0 ? void 0 : options.where,
                    filters: options === null || options === void 0 ? void 0 : options.filters,
                }),
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
        if (!(options === null || options === void 0 ? void 0 : options.returning)) {
            return;
        }
        const newRow = await this.findOne({
            where: options === null || options === void 0 ? void 0 : options.where,
            filters: options === null || options === void 0 ? void 0 : options.filters,
        });
        if (!newRow) {
            throw new _appError_1.AppError('os-core:Error getting row after update sequelize', {
                errorKey: 'UPDATE_ROW_ERROR',
            });
        }
        return newRow;
    }
    ;
    async updateMany(row, options) {
        if (!options.returning) {
            try {
                const res = await this.model.update(row, {
                    where: this.dbConnectionSqlModelQueryBuilder.buildWhere({
                        where: options === null || options === void 0 ? void 0 : options.where,
                        filters: options === null || options === void 0 ? void 0 : options.filters,
                    }),
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
        try {
            const res = await this.model.update(row, {
                where: this.dbConnectionSqlModelQueryBuilder.buildWhere({
                    where: options === null || options === void 0 ? void 0 : options.where,
                    filters: options === null || options === void 0 ? void 0 : options.filters,
                }),
                returning: true,
            });
            if ((res === null || res === void 0 ? void 0 : res.length) < 2) {
                return [];
            }
            return res[1];
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error update row sequelize', error);
            throw new _appError_1.AppError('os-core:Error update row sequelize', {
                errorKey: 'UPDATE_ROW_ERROR',
            });
        }
    }
    ;
    async destroy(props) {
        let res = null;
        try {
            res = await this.model.destroy({
                where: this.dbConnectionSqlModelQueryBuilder.buildWhere({
                    where: props === null || props === void 0 ? void 0 : props.where,
                    filters: props === null || props === void 0 ? void 0 : props.filters,
                }),
            });
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error delete row sequelize', error);
            throw new _appError_1.AppError('os-core:Error delete row sequelize', {
                errorKey: 'DELETE_ROW_ERROR',
            });
        }
        if (!res) {
            throw new _appError_1.AppError('os-core:Error delete row sequeliz', {
                errorKey: 'DELETE_ROW_ERROR',
            });
        }
        return res;
    }
    ;
    async findAll(option) {
        try {
            const raw = this.dbConnectionSqlModelQueryBuilder.getRawOption(option === null || option === void 0 ? void 0 : option.include);
            const res = await this.model.findAll({
                where: this.dbConnectionSqlModelQueryBuilder.buildWhere({
                    where: option === null || option === void 0 ? void 0 : option.where,
                    filters: option === null || option === void 0 ? void 0 : option.filters,
                }),
                order: this.dbConnectionSqlModelQueryBuilder.buildOrder({
                    order: option === null || option === void 0 ? void 0 : option.order,
                    include: option === null || option === void 0 ? void 0 : option.include,
                    orderAggregate: option === null || option === void 0 ? void 0 : option.orderAggregate,
                }),
                limit: option === null || option === void 0 ? void 0 : option.limit,
                offset: option === null || option === void 0 ? void 0 : option.offset,
                raw,
                attributes: this.dbConnectionSqlModelQueryBuilder.buildAttributes({
                    attributes: option === null || option === void 0 ? void 0 : option.attributes,
                    aggregates: option === null || option === void 0 ? void 0 : option.aggregates,
                }),
                include: this.dbConnectionSqlModelQueryBuilder.getIncludes(option === null || option === void 0 ? void 0 : option.include),
                nest: true,
                group: option === null || option === void 0 ? void 0 : option.group,
            });
            if (!(res === null || res === void 0 ? void 0 : res.length)) {
                return [];
            }
            if (!raw) {
                return res.map((row) => row.toJSON());
            }
            return res;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error get rows sequelize', error);
            return [];
        }
    }
    async count(option) {
        try {
            const res = await this.model.count({
                where: this.dbConnectionSqlModelQueryBuilder.buildWhere({
                    where: option === null || option === void 0 ? void 0 : option.where,
                    filters: option === null || option === void 0 ? void 0 : option.filters,
                }),
                include: this.dbConnectionSqlModelQueryBuilder.getIncludes(option === null || option === void 0 ? void 0 : option.include),
                group: option === null || option === void 0 ? void 0 : option.group,
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
            return 0;
        }
    }
    ;
    async findOne(option) {
        try {
            const res = await this.model.findOne({
                where: this.dbConnectionSqlModelQueryBuilder.buildWhere({
                    where: option === null || option === void 0 ? void 0 : option.where,
                    filters: option === null || option === void 0 ? void 0 : option.filters,
                }),
                raw: true,
                attributes: this.dbConnectionSqlModelQueryBuilder.buildAttributes({
                    attributes: option === null || option === void 0 ? void 0 : option.attributes,
                    aggregates: option === null || option === void 0 ? void 0 : option.aggregates,
                }),
            });
            if (!res) {
                return null;
            }
            return res;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error get row sequelize', error);
            return null;
        }
    }
    ;
    async findByPk(key, option) {
        try {
            const res = await this.model.findByPk(key, {
                attributes: option === null || option === void 0 ? void 0 : option.attributes,
                raw: true,
            });
            if (!res) {
                return null;
            }
            return res;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error get row by key sequelize', error);
            return null;
        }
    }
    ;
    async pagination(params, options) {
        if ((params === null || params === void 0 ? void 0 : params.per_page) === 0) {
            try {
                const rows = await this.findAll({
                    where: params === null || params === void 0 ? void 0 : params.where,
                    order: params === null || params === void 0 ? void 0 : params.order,
                    attributes: options === null || options === void 0 ? void 0 : options.attributes,
                    filters: options === null || options === void 0 ? void 0 : options.filters,
                    include: options === null || options === void 0 ? void 0 : options.include,
                    aggregates: options === null || options === void 0 ? void 0 : options.aggregates,
                    group: options === null || options === void 0 ? void 0 : options.group,
                });
                const countAllRows = rows.length;
                return {
                    page: 1,
                    all_pages: 1,
                    per_page: countAllRows,
                    all_rows: rows.length,
                    rows: (rows || []),
                };
            }
            catch (error) {
                _logger_1.appLogger.error('os-core:Error paginationTypes by api sql', error);
                return this.buildEmptyPagination();
            }
        }
        try {
            const countAllRows = await this.count({
                where: params === null || params === void 0 ? void 0 : params.where,
                filters: options === null || options === void 0 ? void 0 : options.filters,
                include: options === null || options === void 0 ? void 0 : options.include,
                group: options === null || options === void 0 ? void 0 : options.group,
            });
            if (!countAllRows) {
                return this.buildEmptyPagination();
            }
            const perPage = (params === null || params === void 0 ? void 0 : params.per_page) || 10;
            const page = (params === null || params === void 0 ? void 0 : params.page) || 1;
            const offset = (Number(page) - 1) * Number(perPage);
            const rows = await this.findAll({
                offset: offset,
                limit: perPage,
                where: params === null || params === void 0 ? void 0 : params.where,
                order: params === null || params === void 0 ? void 0 : params.order,
                attributes: options === null || options === void 0 ? void 0 : options.attributes,
                filters: options === null || options === void 0 ? void 0 : options.filters,
                include: options === null || options === void 0 ? void 0 : options.include,
                aggregates: options === null || options === void 0 ? void 0 : options.aggregates,
                group: options === null || options === void 0 ? void 0 : options.group,
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
            _logger_1.appLogger.error('os-core:Error paginationTypes by api sql', error);
            return this.buildEmptyPagination();
        }
    }
    ;
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
    _getRawModel() {
        return this.model;
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
    async query(value, options) {
        const res = await this.dbConnection.query(value, options);
        if (!(res === null || res === void 0 ? void 0 : res.length)) {
            return [];
        }
        return res[0];
    }
    async syncModel() {
        await this.model.sync();
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
    buildEmptyPagination() {
        return {
            page: 1,
            all_pages: 1,
            per_page: 0,
            all_rows: 0,
            rows: [],
        };
    }
}
exports.ModelSql = ModelSql;
//# sourceMappingURL=ModelSql.js.map