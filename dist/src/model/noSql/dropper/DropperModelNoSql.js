"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropperModelNoSql = void 0;
const _model_1 = require("../..");
const _helpers_1 = require("../../../helpers");
const _logger_1 = require("../../../logger");
class DropperModelNoSql {
    static async drop(model) {
        const documentsCount = await model.count();
        const config = model.getConfig();
        await model.dropCollection();
        if (documentsCount) {
            _logger_1.appLogger.info(`Success delete collection. Documents count:${documentsCount}, database name:${config.database}, collection name:${config.tableName}`);
        }
        _model_1.LoaderModelNoSql.deleteModelFromCacheByDatabaseNameAndCollectionName({
            collectionName: config.tableName,
            databaseName: config.database,
        });
        return documentsCount;
    }
    static async multiDropByYearMonthDateRange({ getModelCb, dateStart, dateEnd, }) {
        const intervals = _helpers_1.DateHelper.generateDateIntervalsYearAndMonthByRange(dateStart, dateEnd);
        if (!intervals.length) {
            return {
                collectionsCount: 0,
                documentsCount: 0,
            };
        }
        let collectionsCount = 0;
        let documentsCount = 0;
        for (const interval of intervals) {
            try {
                const model = await getModelCb({
                    year: interval.year,
                    month: parseInt(interval.month),
                });
                const targetDocumentsCount = await this.drop(model);
                if (targetDocumentsCount > 0) {
                    collectionsCount++;
                    documentsCount += targetDocumentsCount;
                }
            }
            catch (error) {
                _logger_1.appLogger.error('error drop collection', error);
            }
        }
        return {
            collectionsCount,
            documentsCount,
        };
    }
}
exports.DropperModelNoSql = DropperModelNoSql;
//# sourceMappingURL=DropperModelNoSql.js.map