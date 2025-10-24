"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSqlRepositoriesCashManager = void 0;
const _logger_1 = require("../../../logger");
const repositories = {};
function buildCollectionKey(props) {
    return `${props.databaseName}_${props.collectionName}`;
}
class NoSqlRepositoriesCashManager {
    static getRepositoryKeysFromCache() {
        return Object.keys(repositories);
    }
    static deleteRepositoryFromCacheByDatabaseNameAndCollectionName(props) {
        const key = buildCollectionKey({
            databaseName: props.databaseName,
            collectionName: props.collectionName,
        });
        if (!(key in repositories)) {
            _logger_1.appLogger.error(`delete model:not found model ${key} in cache`);
            return;
        }
        delete repositories[key];
    }
    static saveToCash(key, repository) {
        repositories[key] = repository;
    }
    static getFromCash(key) {
        if (key in repositories) {
            return repositories[key];
        }
        return null;
    }
}
exports.NoSqlRepositoriesCashManager = NoSqlRepositoriesCashManager;
//# sourceMappingURL=NoSqlRepositoriesCashManager.js.map