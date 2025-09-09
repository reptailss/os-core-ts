"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionModelNoSqlColumnsHelper = void 0;
const mongoose_1 = require("mongoose");
class DbConnectionModelNoSqlColumnsHelper {
    static transformBaseColumnToMongoose({ columns, options, }) {
        {
            const fields = {};
            for (const columnKey in columns) {
                //@ts-ignore
                fields[columnKey] = this.getCurrentSchemaMongoose(columns[columnKey]);
            }
            return new mongoose_1.Schema(fields, {
                versionKey: false,
                minimize: false,
                timestamps: {
                    createdAt: (options === null || options === void 0 ? void 0 : options.dateAdd) === null ? false : (options === null || options === void 0 ? void 0 : options.dateAdd) || 'date_add',
                    updatedAt: (options === null || options === void 0 ? void 0 : options.dateUpdate) === null ? false : (options === null || options === void 0 ? void 0 : options.dateUpdate) || 'date_update',
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
        case 'STRING': {
            return {
                type: String,
                default: column.defaultValue,
            };
        }
        case 'OBJECT': {
            return {
                type: Object,
                default: column.defaultValue,
            };
        }
        case 'DATETIME': {
            return {
                type: Date,
                default: column.defaultValue === 'CURRENT_TIMESTAMP' ? Date.now : column.defaultValue,
            };
        }
        default: {
            return {
                type: String,
            };
        }
    }
};
//# sourceMappingURL=DbConnectionModelNoSqlColumnsHelper.js.map