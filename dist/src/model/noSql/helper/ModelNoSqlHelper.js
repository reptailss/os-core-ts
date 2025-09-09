"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelNoSqlHelper = void 0;
const _helpers_1 = require("../../../helpers");
class ModelNoSqlHelper {
    static getCollectionNamesPaginationByDateRangeNoSql({ dateStart, dateEnd, }) {
        return _helpers_1.DateHelper.generateDateIntervalsYearAndMonthByRange(dateStart, dateEnd).map((item) => {
            return `${item.year}||${item.month}`;
        });
    }
    static getYearAndMothByCollectionName(collectionName) {
        const arr = collectionName === null || collectionName === void 0 ? void 0 : collectionName.split('||');
        if (arr.length < 2) {
            return {
                year: 0,
                month: 0,
            };
        }
        return {
            year: Number(arr[0]),
            month: Number(arr[1]),
        };
    }
    ;
    static checkReverseCollection({ order, dateFilterKey, }) {
        if (!dateFilterKey ||
            !order ||
            !(dateFilterKey in order)) {
            return false;
        }
        //@ts-ignore
        return order[dateFilterKey] === 'DESC';
    }
}
exports.ModelNoSqlHelper = ModelNoSqlHelper;
//# sourceMappingURL=ModelNoSqlHelper.js.map