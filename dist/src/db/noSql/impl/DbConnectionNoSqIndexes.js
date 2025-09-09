"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionNoSqIndexes = void 0;
const _logger_1 = require("../../../logger");
class DbConnectionNoSqIndexes {
    constructor() {
        this.initIndexesMongoose = async ({ indexes, model, dbConnection, collectionName, }) => {
            var _a, _b, _c;
            if (!(indexes === null || indexes === void 0 ? void 0 : indexes.length)) {
                return;
            }
            const collections = await ((_a = dbConnection.db) === null || _a === void 0 ? void 0 : _a.listCollections({ name: collectionName }).toArray());
            if (!collections || !collections.length) {
                await dbConnection.createCollection(collectionName);
                _logger_1.appLogger.info(`os-core:Mongodb create collection:${collectionName}`);
            }
            const oldIndexes = await model.collection.listIndexes().toArray();
            const oldIndexesByColumns = {};
            if (oldIndexes.length) {
                oldIndexes.forEach((index) => {
                    const key = this.getKeyByColumns(index.key);
                    oldIndexesByColumns[index === null || index === void 0 ? void 0 : index.name] = true;
                    oldIndexesByColumns[key] = true;
                });
            }
            for (const index of indexes) {
                if (((_b = index === null || index === void 0 ? void 0 : index.options) === null || _b === void 0 ? void 0 : _b.name) && ((_c = index === null || index === void 0 ? void 0 : index.options) === null || _c === void 0 ? void 0 : _c.name) in oldIndexesByColumns) {
                    continue;
                }
                const key = this.getKeyByColumns(index.columns);
                if (key in oldIndexesByColumns) {
                    continue;
                }
                try {
                    await dbConnection.collection(collectionName).createIndex(index.columns, index.options);
                }
                catch (error) {
                    _logger_1.appLogger.error(error);
                }
            }
        };
    }
    getKeyByColumns(columns) {
        var _a, _b;
        if (!columns) {
            return '';
        }
        const keys = (_a = Object.entries(columns)) === null || _a === void 0 ? void 0 : _a.map(([key, value]) => `${key}_${value}`);
        return (_b = keys === null || keys === void 0 ? void 0 : keys.sort()) === null || _b === void 0 ? void 0 : _b.join('_');
    }
}
exports.DbConnectionNoSqIndexes = DbConnectionNoSqIndexes;
//# sourceMappingURL=DbConnectionNoSqIndexes.js.map