"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlMigrations = void 0;
const _appError_1 = require("../../../../appError");
const _logger_1 = require("../../../../logger");
class SqlMigrations {
    constructor(dbConnection, tableName) {
        this.dbConnection = dbConnection;
        this.tableName = tableName;
    }
    async renameColumn(oldColumnName, newColumnName) {
        const tableExists = await this.dbConnection.tableExists(this.tableName);
        if (!tableExists) {
            throw new _appError_1.AppError(`os-core:Table ${this.tableName} does not exist.`, {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        try {
            const columns = await this.dbConnection.getColumnsTable(this.tableName);
            if (!columns ||
                newColumnName in columns ||
                !(oldColumnName in columns)) {
                throw new _appError_1.AppError(`Column ${newColumnName} already exists or ${oldColumnName} does not exist.`, {
                    errorKey: 'SERVER_SIDE_ERROR',
                });
            }
            await this.dbConnection.renameColumn(this.tableName, oldColumnName, newColumnName);
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error delete dynamic column', error);
            throw new _appError_1.AppError('os-core:Error delete dynamic column', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    async addColumns(columns) {
        const tableExists = await this.dbConnection.tableExists(this.tableName);
        if (!tableExists) {
            throw new _appError_1.AppError(`os-core: Table ${this.tableName} does not exist.`, {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        try {
            const tableColumns = await this.dbConnection.getColumnsTable(this.tableName);
            for (const columnName in columns) {
                if (columnName in tableColumns) {
                    continue;
                }
                await this.dbConnection.addColumn(this.tableName, columnName, columns[columnName]);
            }
        }
        catch (error) {
            _logger_1.appLogger.error('os-core: Error adding dynamic columns', error);
            throw new _appError_1.AppError('os-core: Error adding dynamic columns:', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    async removeColumns(columns) {
        const tableExists = await this.dbConnection.tableExists(this.tableName);
        if (!tableExists) {
            throw new _appError_1.AppError(`os-core:Table ${this.tableName} does not exist.`, {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        try {
            const tableColumns = await this.dbConnection.getColumnsTable(this.tableName);
            for (const columnName of columns) {
                if (!(columnName in tableColumns)) {
                    continue;
                }
                await this.dbConnection.removeColumn(this.tableName, columnName);
            }
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error delete dynamic column', error);
            throw new _appError_1.AppError('os-core:Error delete dynamic column', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    async updateColumn(columnName, column) {
        const tableExists = await this.dbConnection.tableExists(this.tableName);
        if (!tableExists) {
            throw new _appError_1.AppError(`os-core:Table ${this.tableName} does not exist.`, {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        try {
            const tableColumns = await this.dbConnection.getColumnsTable(this.tableName);
            if (!(columnName in tableColumns)) {
                return;
            }
            await this.dbConnection.changeColumn(this.tableName, columnName, column);
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error delete dynamic column', error);
            throw new _appError_1.AppError('os-core:Error delete dynamic column', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    async getColumns() {
        return this.dbConnection.getColumnsTable(this.tableName);
    }
    getTableName() {
        return this.tableName;
    }
    async deleteAssociation({ tableName, referenceColumnKey, }) {
        const tableExists = await this.dbConnection.tableExists(tableName);
        if (!tableExists) {
            throw new _appError_1.AppError(`os-core: Table ${tableName} does not exist.`, {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        try {
            const results = await this.dbConnection.query(`
                SELECT CONSTRAINT_NAME
                FROM information_schema.KEY_COLUMN_USAGE
                WHERE TABLE_SCHEMA = DATABASE()
                  AND TABLE_NAME = :tableName
                  AND COLUMN_NAME = :referenceColumnKey
                  AND REFERENCED_TABLE_NAME IS NOT NULL LIMIT 1
            `, {
                replacements: {
                    tableName,
                    referenceColumnKey,
                },
            });
            if (!(results === null || results === void 0 ? void 0 : results.length)) {
                throw new _appError_1.AppError(`os-core: Foreign key constraint on column ${referenceColumnKey} not found in table ${tableName}`, {
                    errorKey: 'NOT_FOUND_ERROR',
                });
            }
            const constraintName = results[0].CONSTRAINT_NAME;
            await this.dbConnection.query(`ALTER TABLE \`${tableName}\` DROP FOREIGN KEY \`${constraintName}\`;`);
        }
        catch (error) {
            _logger_1.appLogger.error(`os-core: Error dropping association for table ${tableName} by column ${referenceColumnKey}`, error);
            throw new _appError_1.AppError(`os-core: Error dropping association for table ${tableName} by column ${referenceColumnKey}`, {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    async addAssociationBelongsTo({ tableName: referencedTable, referenceColumnKey, referencedColumnPrimaryNumberKey, }) {
        await this.addAssociationHasOne({ tableName: referencedTable, referenceColumnKey, referencedColumnPrimaryNumberKey });
    }
    async addAssociationHasOne({ tableName: referencedTable, referenceColumnKey, onDelete, referencedColumnPrimaryNumberKey = 'id', }) {
        const columnName = referenceColumnKey;
        const constraintName = `fk_${this.tableName}_${referencedTable}_${columnName}`;
        await this.ensureTablesExist(this.tableName, referencedTable);
        const onDeleteClause = onDelete ? `ON DELETE ${onDelete}` : '';
        const query = `
            ALTER TABLE \`${this.tableName}\`
                ADD CONSTRAINT \`${constraintName}\`
                    FOREIGN KEY (\`${columnName}\`)
                        REFERENCES \`${referencedTable}\` (\`${referencedColumnPrimaryNumberKey}\`)
                ${onDeleteClause};
        `;
        try {
            await this.dbConnection.query(query);
        }
        catch (error) {
            _logger_1.appLogger.error(`os-core: Error adding has one association`, error);
            throw new _appError_1.AppError(`os-core: Error adding has one association`, {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    async addAssociationHasMany({ tableName: childTable, referenceColumnKey, onDelete, referencedColumnPrimaryNumberKey = 'id', }) {
        const columnName = referenceColumnKey;
        const constraintName = `fk_${childTable}_${this.tableName}_${columnName}`;
        await this.ensureTablesExist(childTable, this.tableName);
        const onDeleteClause = onDelete ? `ON DELETE ${onDelete}` : '';
        const query = `
            ALTER TABLE \`${childTable}\`
                ADD CONSTRAINT \`${constraintName}\`
                    FOREIGN KEY (\`${columnName}\`)
                        REFERENCES \`${this.tableName}\` (\`${referencedColumnPrimaryNumberKey}\`)
                ${onDeleteClause};
        `;
        try {
            await this.dbConnection.query(query);
        }
        catch (error) {
            _logger_1.appLogger.error(`os-core: Error adding has many association`, error);
            throw new _appError_1.AppError(`os-core: Error adding has many association`, {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    async deleteIndex(indexName) {
        const query = `DROP INDEX \`${indexName}\` ON \`${this.tableName}\`;`;
        try {
            await this.dbConnection.query(query);
        }
        catch (error) {
            _logger_1.appLogger.error(`Error removing index ${indexName} on ${this.tableName}`, error);
            throw new _appError_1.AppError(`Error removing index ${indexName} on ${this.tableName}`, {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    async addIndex(index) {
        var _a, _b, _c;
        const indexName = ((_a = index === null || index === void 0 ? void 0 : index.options) === null || _a === void 0 ? void 0 : _a.name) || `idx_${this.tableName}_${Object.keys(index.columns).join('_')}`;
        const uniqueStr = ((_b = index === null || index === void 0 ? void 0 : index.options) === null || _b === void 0 ? void 0 : _b.unique) ? 'UNIQUE' : '';
        const usingStr = ((_c = index === null || index === void 0 ? void 0 : index.options) === null || _c === void 0 ? void 0 : _c.using) ? `USING ${index.options.using}` : '';
        const cols = Object.entries(index.columns).map(([col, opts]) => {
            let colDef = `\`${col}\``;
            if (opts.length !== undefined)
                colDef += `(${opts.length})`;
            if (opts.order !== undefined)
                colDef += ` ${opts.order}`;
            return colDef;
        }).join(', ');
        try {
            await this.dbConnection.query(`
                CREATE
                ${uniqueStr} INDEX \`${indexName}\` ON \`${this.tableName}\`
                ${usingStr}
                (
                ${cols}
                );
            `);
        }
        catch (error) {
            _logger_1.appLogger.error(`Error adding index ${indexName} on ${this.tableName}`, error);
            throw new _appError_1.AppError(`Error adding index ${indexName} on ${this.tableName}`, {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    async ensureTablesExist(...tableNames) {
        for (const table of tableNames) {
            const exists = await this.dbConnection.tableExists(table);
            if (!exists) {
                throw new _appError_1.AppError(`os-core: Table ${table} does not exist.`, {
                    errorKey: 'SERVER_SIDE_ERROR',
                });
            }
        }
    }
}
exports.SqlMigrations = SqlMigrations;
//# sourceMappingURL=SqlMigrations.js.map