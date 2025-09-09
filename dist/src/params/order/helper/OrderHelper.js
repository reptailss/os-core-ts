"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderHelper = void 0;
class OrderHelper {
    static getOrderFromReq(req) {
        var _a;
        return (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.order;
    }
}
exports.OrderHelper = OrderHelper;
//# sourceMappingURL=OrderHelper.js.map