"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OsCoreMeasurementUnitsService = void 0;
const _redis_1 = require("../../redis");
class OsCoreMeasurementUnitsService {
    static buildProductRedisKey(unitId) {
        return `socium:products_measurement_units:by_id:${unitId}`;
    }
    static async getProductUnitFromRedis(unitId) {
        var _a;
        const res = await _redis_1.RedisStaticService.getMapValue(this.buildProductRedisKey(unitId));
        if (!res || !('id' in res)) {
            return null;
        }
        return {
            id: Number(res === null || res === void 0 ? void 0 : res.id),
            code: res === null || res === void 0 ? void 0 : res.code,
            name: res === null || res === void 0 ? void 0 : res.name,
            description: res === null || res === void 0 ? void 0 : res.description,
            short_name_uk: res === null || res === void 0 ? void 0 : res.short_name_uk,
            short_name_international: res === null || res === void 0 ? void 0 : res.short_name_international,
            active: ((_a = res === null || res === void 0 ? void 0 : res.active) === null || _a === void 0 ? void 0 : _a.toString()) === '1' ? 1 : 0,
            date_add: res === null || res === void 0 ? void 0 : res.date_add,
            date_update: res === null || res === void 0 ? void 0 : res.date_update,
        };
    }
}
exports.OsCoreMeasurementUnitsService = OsCoreMeasurementUnitsService;
//# sourceMappingURL=OsCoreMeasurementUnitsService.js.map