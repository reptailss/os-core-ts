"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OsCoreMeasurementProductUnitsCashedByIdsService = void 0;
const _appError_1 = require("../../appError");
const _logger_1 = require("../../logger");
const _services_1 = require("..");
const unitsMap = {};
class OsCoreMeasurementProductUnitsCashedByIdsService {
    constructor(syncIntervalInMinutes = 90) {
        this.syncIntervalInMinutes = syncIntervalInMinutes;
        this.lastSyncDate = null;
    }
    getUnit(unitId) {
        if (!this.lastSyncDate) {
            throw new _appError_1.AppError('No units synchronization. You must call syncUnits() before calling', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        if (!(unitId in unitsMap)) {
            return null;
        }
        return unitsMap[unitId];
    }
    getMapUnitNames() {
        var _a;
        const mapNames = {};
        for (const unitId in unitsMap) {
            mapNames[unitId] = (_a = unitsMap[unitId]) === null || _a === void 0 ? void 0 : _a.name;
        }
        return mapNames;
    }
    async syncUnits(unitIds) {
        if (!(unitIds === null || unitIds === void 0 ? void 0 : unitIds.length)) {
            return;
        }
        const now = new Date();
        if (!this.lastSyncDate) {
            await this.saveUnitsByIds(unitIds);
            this.lastSyncDate = now;
            return;
        }
        const hasUnitsInCashByIds = this.checkHasUnitsInCashByIds(unitIds);
        if (!hasUnitsInCashByIds) {
            await this.saveUnitsByIds(unitIds);
            this.lastSyncDate = now;
            return;
        }
        const elapsedTimeInMinutes = (now.getTime() - this.lastSyncDate.getTime()) / (1000 * 60);
        if (elapsedTimeInMinutes < this.syncIntervalInMinutes) {
            return;
        }
        await this.saveUnitsByIds(unitIds);
        this.lastSyncDate = now;
    }
    async saveUnitsByIds(unitIds) {
        var _a;
        _logger_1.appLogger.info('Start sync units');
        for (const unitId of unitIds) {
            const unit = await _services_1.OsCoreMeasurementUnitsService.getProductUnitFromRedis(unitId);
            if (!unit) {
                _logger_1.appLogger.error('Not found unit in redis', unitId);
                continue;
            }
            unitsMap[unitId] = unit;
        }
        _logger_1.appLogger.info(`End sync units.New units count ${(_a = Object.keys(unitsMap)) === null || _a === void 0 ? void 0 : _a.length}`);
    }
    checkHasUnitsInCashByIds(unitIds) {
        let hasUnitsInCashIds = true;
        for (const unitId of unitIds) {
            if (unitId in unitsMap) {
                continue;
            }
            hasUnitsInCashIds = false;
            break;
        }
        return hasUnitsInCashIds;
    }
}
exports.OsCoreMeasurementProductUnitsCashedByIdsService = OsCoreMeasurementProductUnitsCashedByIdsService;
//# sourceMappingURL=OsCoreMeasurementProductUnitsCashedByIdsService.js.map