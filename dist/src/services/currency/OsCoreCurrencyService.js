"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OsCoreCurrencyService = void 0;
const _redis_1 = require("../../redis");
class OsCoreCurrencyService {
    static buildRedisKey(currencyId) {
        return `socium:currencies:by_id:${currencyId}`;
    }
    static async getCurrencyFromRedis(currencyId) {
        var _a, _b, _c;
        const res = await _redis_1.RedisStaticService.getMapValue(this.buildRedisKey(currencyId));
        if (!res || !('id' in res)) {
            return null;
        }
        return {
            id: Number(res === null || res === void 0 ? void 0 : res.id),
            name: res === null || res === void 0 ? void 0 : res.name,
            iso: res === null || res === void 0 ? void 0 : res.iso,
            value: (res === null || res === void 0 ? void 0 : res.value) ? Number(res === null || res === void 0 ? void 0 : res.value) : 0,
            legal_entity_id: Number(res === null || res === void 0 ? void 0 : res.legal_entity_id),
            active: ((_a = res === null || res === void 0 ? void 0 : res.active) === null || _a === void 0 ? void 0 : _a.toString()) === '1' ? 1 : 0,
            is_default: ((_b = res === null || res === void 0 ? void 0 : res.active) === null || _b === void 0 ? void 0 : _b.toString()) === '1' ? 1 : 0,
            hide: ((_c = res === null || res === void 0 ? void 0 : res.active) === null || _c === void 0 ? void 0 : _c.toString()) === '1' ? 1 : 0,
            date_add: res === null || res === void 0 ? void 0 : res.date_add,
            date_update: res === null || res === void 0 ? void 0 : res.date_update,
        };
    }
}
exports.OsCoreCurrencyService = OsCoreCurrencyService;
//# sourceMappingURL=OsCoreCurrencyService.js.map