"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionModelNoSqlColumnsHelper = void 0;
const mongoose_1 = require("mongoose");
const _appError_1 = require("../../../appError");
class DbConnectionModelNoSqlColumnsHelper {
    static transformBaseColumnToMongoose(columns, options) {
        {
            const fields = {};
            if ((options === null || options === void 0 ? void 0 : options.primaryKey) && options.primaryKey !== '_id') {
                fields['_id'] = false;
                fields[options.primaryKey] = this.getCurrentSchemaMongoose({
                    type: 'PRIMARY_KEY',
                });
            }
            for (const columnKey in columns) {
                fields[columnKey] = this.getCurrentSchemaMongoose(columns[columnKey]);
            }
            return new mongoose_1.Schema(fields, {
                versionKey: false,
                minimize: false,
                timestamps: {
                    createdAt: (options === null || options === void 0 ? void 0 : options.dateAdd) || false,
                    updatedAt: (options === null || options === void 0 ? void 0 : options.dateUpdate) || false,
                },
            });
        }
    }
}
exports.DbConnectionModelNoSqlColumnsHelper = DbConnectionModelNoSqlColumnsHelper;
DbConnectionModelNoSqlColumnsHelper.getCurrentSchemaMongoose = (column) => {
    switch (column.type) {
        case 'INTEGER': {
            return {
                type: Number,
                default: column.defaultValue,
            };
        }
        case 'BIGINT': {
            return {
                type: Number,
                default: column.defaultValue,
            };
        }
        case 'FLOAT': {
            return {
                type: Number,
                default: column.defaultValue,
            };
        }
        case 'STRING': {
            return {
                type: String,
                default: column.defaultValue,
            };
        }
        case 'TEXT': {
            return {
                type: String,
                default: column.defaultValue,
            };
        }
        case 'JSON': {
            return {
                type: Object,
                default: column.defaultValue,
            };
        }
        case 'BOOLEAN': {
            return {
                type: Boolean,
                default: column.defaultValue,
            };
        }
        case 'PRIMARY_KEY': {
            return {
                type: mongoose_1.Types.ObjectId,
                default: () => new mongoose_1.Types.ObjectId(),
                index: true,
                unique: true,
                required: true,
            };
        }
        case 'DATETIME': {
            return {
                type: Date,
                default: column.defaultValue === 'CURRENT_TIMESTAMP' ? Date.now : column.defaultValue,
            };
        }
        default: {
            throw new _appError_1.AppError(`Not found entity type in column ${JSON.stringify(column)}`);
        }
    }
};
//# sourceMappingURL=DbConnectionModelNoSqlColumnsHelper.js.map