"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionModelSqlColumnsHelper = void 0;
const sequelize_1 = require("sequelize");
class DbConnectionModelSqlColumnsHelper {
    static transformBaseColumnToSequelize(columns, options) {
        const currentPrimaryKey = (options === null || options === void 0 ? void 0 : options.primaryKey) || 'id';
        const currentDateAdd = typeof (options === null || options === void 0 ? void 0 : options.dateAdd) === 'undefined' ? 'date_add' : (options === null || options === void 0 ? void 0 : options.dateAdd) === null ? false : options === null || options === void 0 ? void 0 : options.dateAdd;
        const currentDateUpdate = typeof (options === null || options === void 0 ? void 0 : options.dateUpdate) === 'undefined' ? 'date_update' : (options === null || options === void 0 ? void 0 : options.dateUpdate) === null ? false : options === null || options === void 0 ? void 0 : options.dateUpdate;
        const newColumns = {
            [currentPrimaryKey]: {
                type: sequelize_1.DataTypes.INTEGER({ length: 11 }),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
        };
        if (currentDateAdd) {
            newColumns[currentDateAdd] = this.columnBaseToSequelizeColumn({
                type: 'DATETIME',
                defaultValue: 'CURRENT_TIMESTAMP',
            });
        }
        if (currentDateUpdate) {
            newColumns[currentDateUpdate] = this.columnBaseToSequelizeColumn({
                type: 'DATETIME',
                defaultValue: 'CURRENT_TIMESTAMP',
            });
        }
        for (const columnKey in columns) {
            newColumns[columnKey] = this.columnBaseToSequelizeColumn(columns[columnKey]);
        }
        return newColumns;
    }
    static getCurrentTypeColumnSequelize(column) {
        var _a, _b, _c, _d, _e;
        switch (column.type) {
            case 'INTEGER': {
                if ((_a = column === null || column === void 0 ? void 0 : column.options) === null || _a === void 0 ? void 0 : _a.length) {
                    return sequelize_1.DataTypes.INTEGER(column.options.length);
                }
                return sequelize_1.DataTypes.INTEGER();
            }
            case 'BIGINT': {
                if ((_b = column === null || column === void 0 ? void 0 : column.options) === null || _b === void 0 ? void 0 : _b.length) {
                    return sequelize_1.DataTypes.BIGINT(column.options.length);
                }
                return sequelize_1.DataTypes.BIGINT();
            }
            case 'FLOAT': {
                if ((_c = column === null || column === void 0 ? void 0 : column.options) === null || _c === void 0 ? void 0 : _c.length) {
                    return sequelize_1.DataTypes.BIGINT(column.options.length);
                }
                return sequelize_1.DataTypes.BIGINT();
            }
            case 'STRING': {
                if ((_d = column === null || column === void 0 ? void 0 : column.options) === null || _d === void 0 ? void 0 : _d.length) {
                    return sequelize_1.DataTypes.STRING(column.options.length);
                }
                return sequelize_1.DataTypes.STRING();
            }
            case 'TEXT': {
                if ((_e = column === null || column === void 0 ? void 0 : column.options) === null || _e === void 0 ? void 0 : _e.length) {
                    return sequelize_1.DataTypes.TEXT(column.options.length);
                }
                return sequelize_1.DataTypes.TEXT();
            }
            case 'JSON': {
                return sequelize_1.DataTypes.JSON();
            }
            case 'DATETIME': {
                return 'DATETIME';
            }
            case 'BOOLEAN': {
                return sequelize_1.DataTypes.BOOLEAN();
            }
            default:
                return sequelize_1.DataTypes.STRING();
        }
    }
    static columnBaseToSequelizeColumn(column) {
        switch (column.type) {
            case 'INTEGER': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column),
                    allowNull: column.allowNull,
                    defaultValue: column.defaultValue,
                };
            }
            case 'BIGINT': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column),
                    allowNull: column.allowNull,
                    defaultValue: column.defaultValue,
                };
            }
            case 'FLOAT': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column),
                    allowNull: column.allowNull,
                    defaultValue: column.defaultValue,
                };
            }
            case 'STRING': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column),
                    allowNull: column.allowNull,
                    defaultValue: column.defaultValue,
                };
            }
            case 'TEXT': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column),
                    allowNull: column.allowNull,
                    defaultValue: column.defaultValue,
                };
            }
            case 'JSON': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column),
                    defaultValue: column.defaultValue,
                };
            }
            case 'DATETIME': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column),
                    defaultValue: column.defaultValue === 'CURRENT_TIMESTAMP' ? sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP') : column.defaultValue,
                };
            }
            case 'BOOLEAN': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column),
                    defaultValue: column.defaultValue,
                };
            }
            default: {
                return {
                    type: this.getCurrentTypeColumnSequelize(column),
                };
            }
        }
    }
    static transformDescribeSequelizeColumnToBase(column) {
        const { type, options } = this.getTypeOptions(column.type);
        if (!options) {
            return {
                allowNull: column.allowNull,
                defaultValue: column.defaultValue,
                type: type,
            };
        }
        return {
            allowNull: column.allowNull,
            defaultValue: column.defaultValue,
            type: this.getColumnType(type),
            options: {
                length: options,
            },
        };
    }
    static transformIndexesToSequelize(indexes) {
        if (!(indexes === null || indexes === void 0 ? void 0 : indexes.length)) {
            return [];
        }
        return indexes.map((index) => {
            var _a, _b, _c;
            return Object.assign(Object.assign(Object.assign(Object.assign({}, (((_a = index.options) === null || _a === void 0 ? void 0 : _a.name) ? { name: index.options.name } : {})), (((_b = index.options) === null || _b === void 0 ? void 0 : _b.unique) ? { unique: index.options.unique } : {})), (((_c = index.options) === null || _c === void 0 ? void 0 : _c.using) ? { using: index.options.using } : {})), { fields: Object.entries(index.columns).map(([name, options]) => {
                    return Object.assign(Object.assign({ name }, ((options === null || options === void 0 ? void 0 : options.order) ? { order: options === null || options === void 0 ? void 0 : options.order } : {})), ((options === null || options === void 0 ? void 0 : options.length) ? { length: options === null || options === void 0 ? void 0 : options.length } : {}));
                }) });
        });
    }
    static getTypeOptions(input) {
        var _a;
        const match = input.match(/^(.*?)(\s*\((.*?)\))?$/);
        const type = match ? match[1].trim() : '';
        const options = match && match[2] ? (_a = match[3]) === null || _a === void 0 ? void 0 : _a.trim() : null;
        let parsedOptions = null;
        if (options) {
            const numericValue = parseFloat(options);
            parsedOptions = isNaN(numericValue) ? options : numericValue;
        }
        return { options: parsedOptions, type };
    }
    static getColumnType(type) {
        switch (type) {
            case 'INT':
                return 'INTEGER';
            case 'DATETIME':
                return 'DATETIME';
            case 'VARCHAR':
                return 'STRING';
            case 'LONGTEXT':
                return 'TEXT';
            case 'FLOAT':
                return 'FLOAT';
            case 'BIGINT':
                return 'BIGINT';
            case 'JSON':
                return 'JSON';
            default:
                return type;
        }
    }
}
exports.DbConnectionModelSqlColumnsHelper = DbConnectionModelSqlColumnsHelper;
//# sourceMappingURL=DbConnectionModelSqlColumnsHelper.js.map