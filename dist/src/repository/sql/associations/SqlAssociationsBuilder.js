"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlAssociationsBuilder = void 0;
class SqlAssociationsBuilder {
    static belongsTo({ tableName, referenceColumnKey, }) {
        return {
            tableName,
            referenceColumnKey,
            type: 'belongsTo',
        };
    }
    static hasMany({ tableName, referenceColumnKey, onDelete, }) {
        return {
            tableName,
            referenceColumnKey,
            type: 'hasMany',
            onDelete,
        };
    }
    static hasOne({ tableName, referenceColumnKey, onDelete, }) {
        return {
            tableName,
            referenceColumnKey,
            type: 'hasOne',
            onDelete,
        };
    }
}
exports.SqlAssociationsBuilder = SqlAssociationsBuilder;
//# sourceMappingURL=SqlAssociationsBuilder.js.map