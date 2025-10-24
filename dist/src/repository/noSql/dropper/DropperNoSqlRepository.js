"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropperNoSqlRepository = void 0;
const _helpers_1 = require("../../../helpers");
const _logger_1 = require("../../../logger");
const core_1 = require("../../core");
class DropperNoSqlRepository {
    static async drop(repository) {
        const documentsCount = await repository.count({});
        const config = repository.getConfig();
        await repository.dropCollection();
        if (documentsCount) {
            _logger_1.appLogger.info(`Success delete collection. Documents count:${documentsCount}, database name:${config.database}, collection name:${config.tableName}`);
        }
        core_1.NoSqlRepositoriesCashManager.deleteRepositoryFromCacheByDatabaseNameAndCollectionName({
            collectionName: config.tableName,
            databaseName: config.database,
        });
        return documentsCount;
    }
    static async multiDropByYearMonthDateRange({ loaderRepository, dateStart, dateEnd, }) {
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
                const repository = await loaderRepository.load.call(loaderRepository, parseInt(interval.month), interval.year);
                const targetDocumentsCount = await this.drop(repository);
                collectionsCount++;
                if (targetDocumentsCount > 0) {
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
exports.DropperNoSqlRepository = DropperNoSqlRepository;
//# sourceMappingURL=DropperNoSqlRepository.js.map