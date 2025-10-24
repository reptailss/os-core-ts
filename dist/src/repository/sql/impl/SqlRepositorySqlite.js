"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlRepositorySqlite = void 0;
const _repository_1 = require("../..");
class SqlRepositorySqlite extends _repository_1.SqlRepository {
    constructor(dbConnection, tableName, classEntity, indexes, includes) {
        super(dbConnection, tableName, classEntity, indexes, includes);
        const entity = classEntity;
        this._columns = Object.assign({}, entity._columns);
        if (entity._primaryKey) {
            this._columns[entity._primaryKey] = {
                type: 'PRIMARY_KEY',
            };
        }
        if (entity._dateAdd) {
            this._columns[entity._dateAdd] = {
                type: 'DATETIME',
            };
        }
        if (entity._dateUpdate) {
            this._columns[entity._dateUpdate] = {
                type: 'DATETIME',
            };
        }
    }
    async create(createEntity) {
        const entity = await super.create(this.serializeRow(createEntity));
        return this.parseRow(entity);
    }
    async update(updateEntity, findOptions, hasReturning) {
        const entity = await super.update(this.serializeRow(updateEntity), findOptions, hasReturning);
        if (entity) {
            return this.parseRow(entity);
        }
        return entity;
    }
    async updateMany(updateEntity, findOptions) {
        return super.updateMany(this.serializeRow(updateEntity), findOptions);
    }
    async findOne(findOptions) {
        const entity = await super.findOne(findOptions);
        if (!entity) {
            return null;
        }
        return this.parseRow(entity);
    }
    async findByPk(value) {
        const entity = await super.findByPk(value);
        if (!entity) {
            return null;
        }
        return this.parseRow(entity);
    }
    async findAll(findOptions) {
        const entities = await super.findAll(findOptions);
        return entities.map((row) => this.parseRow(row));
    }
    async pagination(params, paginationOptions) {
        const pagination = await super.pagination(params, paginationOptions);
        return {
            page: pagination.page,
            all_pages: pagination.all_pages,
            all_rows: pagination.all_rows,
            rows: pagination.rows.map((row) => this.parseRow(row)),
            per_page: pagination.per_page,
        };
    }
    parseRow(row) {
        const res = {};
        for (const key in row) {
            const value = row[key];
            const column = this._columns[key];
            if (!column) {
                res[key] = value;
                continue;
            }
            if (column.type === 'JSON' && typeof value === 'string') {
                try {
                    res[key] = JSON.parse(value);
                }
                catch (error) {
                    res[key] = null;
                }
                continue;
            }
            if (column.type === 'DATETIME') {
                if (column.allowNull && value === null) {
                    res[key] = value;
                    continue;
                }
                res[key] = new Date(value);
                continue;
            }
            res[key] = value;
        }
        return res;
    }
    serializeRow(row) {
        const res = {};
        for (const key in row) {
            const value = row[key];
            const column = this._columns[key];
            if (!column) {
                res[key] = value;
                continue;
            }
            if (column.type === 'DATETIME') {
                if (value === null && column.allowNull) {
                    res[key] = value;
                    continue;
                }
                res[key] = new Date(value).toISOString();
                continue;
            }
            res[key] = value;
        }
        return res;
    }
}
exports.SqlRepositorySqlite = SqlRepositorySqlite;
//# sourceMappingURL=SqlRepositorySqlite.js.map