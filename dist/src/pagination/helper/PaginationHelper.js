"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationHelper = void 0;
const _params_1 = require("../../params");
class PaginationHelper {
    static getParamsFromReq(req) {
        var _a, _b;
        const page = ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const perPage = ((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.per_page) || 10;
        const where = _params_1.WhereHelper.getWhereFromReq(req);
        const order = _params_1.OrderHelper.getOrderFromReq(req);
        return {
            page: parseInt(page === null || page === void 0 ? void 0 : page.toString()),
            per_page: parseInt(perPage === null || perPage === void 0 ? void 0 : perPage.toString()),
            where,
            order,
        };
    }
}
exports.PaginationHelper = PaginationHelper;
//# sourceMappingURL=PaginationHelper.js.map