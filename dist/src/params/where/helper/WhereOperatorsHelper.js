"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhereOperatorsHelper = void 0;
class WhereOperatorsHelper {
    static parseOperatorAndKey(str) {
        const array = str.split(' ');
        if (array.length > 1) {
            return {
                key: array[0],
                operator: array[1],
            };
        }
        return {
            key: array[0],
            operator: null,
        };
    }
}
exports.WhereOperatorsHelper = WhereOperatorsHelper;
//# sourceMappingURL=WhereOperatorsHelper.js.map