"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionNoSqIndexes = void 0;
const _logger_1 = require("../../../logger");
class DbConnectionNoSqIndexes {
    constructor(entity) {
        this.entity = entity;
    }
    async initIndexesMongoose({ indexes, model, dbConnection, collectionName, }) {
        var _a;
        const entity = this.entity;
        const collections = await ((_a = dbConnection.db) === null || _a === void 0 ? void 0 : _a.listCollections({ name: collectionName }).toArray());
        if (!(collections === null || collections === void 0 ? void 0 : collections.length)) {
            await dbConnection.createCollection(collectionName);
            _logger_1.appLogger.info(`os-core:Mongodb create collection: ${collectionName}`);
        }
        const oldIndexes = await model.collection.listIndexes().toArray();
        const newIndexKeys = new Set();
        for (const index of indexes) {
            newIndexKeys.add(this.getKeyByColumns(index.columns));
        }
        for (const oldIndex of oldIndexes) {
            const primaryIndexName = `${entity._primaryKey || '_id'}_`;
            if (oldIndex.name === primaryIndexName) {
                continue;
            }
            const oldKey = this.getKeyByColumns(oldIndex.key);
            if (!newIndexKeys.has(oldKey)) {
                try {
                    await dbConnection.collection(collectionName).dropIndex(oldIndex.name);
                    _logger_1.appLogger.info(`os-core:Mongodb dropped outdated index ${oldIndex.name} (${oldKey})`);
                }
                catch (error) {
                    _logger_1.appLogger.error(`os-core:Mongodb failed to drop index ${oldIndex.name}:`, error);
                }
            }
        }
        const updatedIndexes = await model.collection.listIndexes().toArray();
        const existingIndexKeys = new Set();
        for (const i of updatedIndexes) {
            existingIndexKeys.add(this.getKeyByColumns(i.key));
        }
        for (const index of indexes) {
            const newKey = this.getKeyByColumns(index.columns);
            if (existingIndexKeys.has(newKey)) {
                continue;
            }
            try {
                await dbConnection.collection(collectionName).createIndex(index.columns, index.options);
                _logger_1.appLogger.info(`os-core:Mongodb created index on ${collectionName}: ${newKey}`);
            }
            catch (error) {
                _logger_1.appLogger.error(`os-core:Mongodb failed to create index ${newKey}:`, error);
            }
        }
    }
    getKeyByColumns(columns) {
        if (!columns)
            return '';
        return Object.entries(columns)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([field, direction]) => `${field}:${direction}`)
            .join('|');
    }
}
exports.DbConnectionNoSqIndexes = DbConnectionNoSqIndexes;
//# sourceMappingURL=DbConnectionNoSqIndexes.js.map